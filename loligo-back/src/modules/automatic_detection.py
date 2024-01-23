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



def find_text_in_websites(url, search_text):
    links_to_check = get_websites_links(url)
    found_text_sites = []

    # Convert the search text to lowercase for a case-insensitive search
    search_text_lower = search_text.lower()

    for link in links_to_check:
        try:
            with urllib.request.urlopen(link) as response:
                html_content = response.read().decode('utf-8').lower()

                # Check if the search text is present in the content (case-insensitive)
                if search_text_lower in html_content:
                    found_text_sites.append(link)

        except HTTPError as e:
            print(f"HTTP Error {e.code}: {link}")
        except URLError as e:
            print(f"URL Error: {e.reason}")

    return found_text_sites


def test():
# Domain base verification
    url = 'https://polipetto.pp.ua'

    search_text_to_find = "€200,000"

    #one specifc dark pattern
    result = find_text_in_websites(url, search_text_to_find)
    find_text_in_websites(url, search_text_to_find) # dp 1


    if result:
        print(f"The search text was found on the following websites: {result}")
    else:
        print("The search text was not found on any of the websites.")

test()