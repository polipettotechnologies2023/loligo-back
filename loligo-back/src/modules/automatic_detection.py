# https://arrow.tudublin.ie/cgi/viewcontent.cgi?article=1162&context=scschcomart

# test https://devsolc.netlify.app/
# test https://www.victorypiesolutions.com/#team

import urllib.request
import re
from urllib.parse import urlparse, urljoin
from urllib.error import URLError, HTTPError
from .jira_intereactions import ticket_creation
from .db_connection import db_open
from .db_connection import db_close
from .db_connection import db_update
import json

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
        # filtered_links += [urljoin(url, link) for link in re.findall('\"(#.*?)\"', html)]

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
    arrOfLink = set(arrOfLink)
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
                    dp_dict = []
                    for pattern in value: 
                        print(f'Checking the follwoing pattern {pattern}')
                        search_pd_lower = pattern.lower()
                        if search_pd_lower in html_content:
                            print(f'{pattern} found here {link}')
                            dp_dict.append({ pattern : link})
                    found_pd_sites.append({ dp : dp_dict})



        except HTTPError as e:
            print(f"HTTP Error {e.code}: {link}")
        except URLError as e:
            print(f"URL Error: {e.reason}")
    return found_pd_sites


def automatic_dp_detection(url_link, userData):

    #TODO: think about using multithreading for this -- see above 
    search_dp_to_find = {
        #Look for phrases like “other people are viewing this item now”.
        "Beyond Brignull - Fake Activity" : ["34589034", "Polipetto", "IT services provider"],
        #  Look for phrases like “offer ends in” or “countdown”
        "Beyond Brignull - Fake Countdown " : [ "€200,000", "mario", "Our Mission" ],
    }

    result = find_dp_in_websites(url_link, search_dp_to_find)
    # update endtry in the db
    db_update_req(userData,result)

    # create a jira ticket
    ticket_creation(userData,result)
    return


def db_update_req(userData, result_auto_detection):
    result_auto_detection = json.dumps(result_auto_detection)
    try:
        db_open()
        sql = f"UPDATE ticket SET dark_patterns_automatic_detection_result = '{result_auto_detection}' WHERE ticket_id = '{userData.ticket_id}'"
        db_update(sql)
        # db_close()
        print("db entry updated succesfully")
        return True
    except NameError:
        print(NameError)

    return 400