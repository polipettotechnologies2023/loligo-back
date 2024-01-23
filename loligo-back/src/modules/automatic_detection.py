# https://arrow.tudublin.ie/cgi/viewcontent.cgi?article=1162&context=scschcomart

# test https://devsolc.netlify.app/
# test https://www.victorypiesolutions.com/#team

import urllib.request
import re
from urllib.parse import urlparse, urljoin
from urllib.error import URLError, HTTPError

def is_html(content_type):
    return content_type.startswith('text/html')

def get_websites_links(url):
    arrOfLink = []
    try:
        website = urllib.request.urlopen(url)
        # Read HTML code
        html = website.read().decode('utf-8')

        # Use re.findall to get all the links
        links = re.findall('\"((http|ftp)s?://.*?)\"', html)

        # Filter the links based on the base URL
        base_url = url
        filtered_links = [link[0] for link in links if base_url in link[0]]

        # Add links that start with '#' to the filtered links
        filtered_links += [urljoin(url, link) for link in re.findall('\"(#.*?)\"', html)]

        # Print only text/html pages
        for link in filtered_links:
            try:
                # Check content type
                response = urllib.request.urlopen(link)
                content_type = response.headers.get('Content-Type', '')

                if is_html(content_type):
                    arrOfLink.append(link)

            except urllib.error.HTTPError as e:
                pass  # Ignore HTTP errors
            except urllib.error.URLError as e:
                pass  # Ignore URL errors
            except Exception as e:
                pass  # Ignore other errors

    except urllib.error.HTTPError as e:
        print(f'HTTP Error accessing the main URL {url}: {e.code}')
    except urllib.error.URLError as e:
        print(f'URL Error accessing the main URL {url}: {e.reason}')
    except Exception as e:
        print(f'Error accessing the main URL {url}: {str(e)}')

    return arrOfLink



def find_dp_in_websites(url, search_pd):
    links_to_check = get_websites_links(url)
    found_pd_sites = []
    print(search_pd)

    for link in links_to_check:
        print(f'Checking the follwoing link {link}')
        try:
            with urllib.request.urlopen(link) as response:
                html_content = response.read().decode('utf-8').lower()

                # TODO: the following cold be a function and mulitithreading can be enabled
                for dp, value in search_pd.items():
                    print(f'Checking the follwoing dp {dp}')
                    for pattern in value: 
                        print(f'Checking the follwoing pattern {pattern}')
                        search_pd_lower = pattern.lower()
                        if search_pd_lower in html_content:
                            print(f'{pattern} found here {link}')
                            found_pd_sites.append(link)

        except HTTPError as e:
            print(f"HTTP Error {e.code}: {link}")
        except URLError as e:
            print(f"URL Error: {e.reason}")
    return found_pd_sites


def automatic_dp_detection(url_link):

    #TODO: think about using multithreading for this -- see above 
    search_dp_to_find = {
        #Look for phrases like “other people are viewing this item now”.
        "Beyond Brignull - Fake Activity " : ["34589034", "Polipetto", "IT services provider" ],
        #  Look for phrases like “offer ends in” or “countdown”
        # "Beyond Brignull - Fake Countdown " : [ "€200,000", "mario", "Our Mission" ],
    }

    # TODO: improve results structure, decide id we should create the jira ticker after this function or before
    result = find_dp_in_websites(url_link, search_dp_to_find)
    
    if result:
        print(f"The search text was found on the following websites: {result}")
    else:
        print("The search text was not found on any of the websites.")
    return
