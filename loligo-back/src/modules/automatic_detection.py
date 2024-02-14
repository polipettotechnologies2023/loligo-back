import urllib.request
import requests
from urllib.error import URLError, HTTPError
from .jira_intereactions import update_issue_dp
import json
from urllib.parse import urljoin
from bs4 import BeautifulSoup


def get_websites_links(url):
    links = []
    website = requests.get(url)
    website_text = website.text
    soup = BeautifulSoup(website_text)

    for link in soup.find_all('a'):
        href = link.get('href')
        if href:
            if href.startswith(('http://', 'https://')):
                links.append(href)
            else:
                absolute_url = urljoin(url, href)
                links.append(absolute_url)

    for link in links:
        print(link)

    print(len(links))
    return links


def find_dp_in_websites(url, search_pd):
    links_to_check = get_websites_links(url)
    found_pd_sites = {}

    for link in links_to_check:
        print(f'Checking the following link {link}')
        try:
            with urllib.request.urlopen(link) as response:
                html_content = response.read().decode('utf-8').lower()

                for dp, patterns in search_pd.items():
                    print(f'Checking the following dp {dp}')
                    for pattern in patterns:
                        print(f'Checking the following pattern {pattern}')
                        search_pd_lower = pattern.lower()
                        if search_pd_lower in html_content:
                            print(f'{pattern} found here {link}')
                            if dp in found_pd_sites:
                                if pattern in found_pd_sites[dp]:
                                    found_pd_sites[dp][pattern].append(link)
                                else:
                                    found_pd_sites[dp][pattern] = [link]
                            else:
                                found_pd_sites[dp] = {pattern: [link]}

        except HTTPError as e:
            print(f"HTTP Error {e.code}: {link}")
        except URLError as e:
            print(f"URL Error: {e.reason}")
    return found_pd_sites


def automatic_dp_detection(url_link, userData, issueData):

    #TODO: think about using multithreading for this -- see above 
    search_dp_to_find = {
        #Look for phrases like “other people are viewing this item now”.
        "Beyond Brignull - Fake Activity" : ["This item is in high demand", "Many customers are interested in this product",
                                                 "Explore this frequently viewed item","Discover what others are considering", "This item is gaining popularity", "Find out what's trending right now.", "Discover items getting attention from others", 
                                                 "Explore items that others have been interested in.", "People are buying this item right now", "Join the waitlist to secure your spot", 
                                                "number of people viewed this in the last hour", "Don't miss out on the latest trend!", "VIP access - claim your spot now!",
                                                 "Get access before everyone else does", "Join the elite group of early buyers", "This item is in high demand - grab yours!", "Exclusive deal for the first 100 customers!", "offered only for a limited amount of time", "Subscribe Now", 
                                                "Sign up for newsletters", "Click Here to Find More Info", "Other people are viewing this product now!", "high demand"],
        #  Look for phrases like “offer ends in” or “countdown”
        "Beyond Brignull - Fake Countdown " : ["Your order is reserved for", "offer ends in", "countdown",  "Flash sale: ending soon!", "limited amount of time"],

        # Look for phrases that come under ConfirmShaming
        "Misdirection - Confirmshaming" : ["No thanks, I don't like free stuff", "No thanks. I don't like free things...", "Yes, I want to save money - who wouldn't?", "No, I don't care about my privacy", "Sure, continue being wasteful",
                                            "No, I prefer paying more for no reason", "Yes, I love missing out on great deals", "No, I'd rather not be a smart shopper", "Yes, I enjoy making bad choices", "Sure, ignore this incredible offer", "No, I don't want to be a savvy consumer",  ],

        # Look for phrases like “only” and “units left”
        "Beyond Bringnull - Low Stock Messages" : ["pieces of items left in stock", "Time is running out! Buy now",  "Act now before it's too late!","Limited stock remaining", "Hurry, only a few items left", "Almost sold out! Act fast!", "Popular choice! Act quickly", 
                                                   "Claimed! Hurry, only a few left!"],
    }

    result = find_dp_in_websites(url_link, search_dp_to_find)
    print(result)

    # update a jira ticket
    update_issue_dp(issueData,result)

    return

