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
        if link == 'javascript:void(0);':
            print(f'Skipping link: {link}')
            continue
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
                "Fake Activity": ["This item is in high demand", "Many customers are interested in this product",
                          "Explore this frequently viewed item", "Discover what others are considering",
                          "This item is gaining popularity", "Find out what's trending right now.",
                          "Discover items getting attention from others",
                          "Explore items that others have been interested in.", "People are buying this item right now",
                          "Join the waitlist to secure your spot", "Join our newsletter"
                          "people viewed this in the last hour", "Don't miss out on the latest trend!",
                          "VIP access - claim your spot now!",
                          "Get access before everyone else does", "Join the elite group of early buyers",
                          "This item is in high demand - grab yours!", "Exclusive deal for the first 100 customers!",
                          "offered only for a limited amount of time", "Subscribe Now",
                          "Sign up for newsletters",
                          "Other people are viewing this product now!", "people are viewing this", "SECONDS AGO",
                          "HOUR AGO", " just bought", "purchased", "minutes ago", "mins ago", "just ordered",
                          "added this item to cart", " to their cart"],
        #  Look for phrases like “offer ends in” or “countdown”
        "Fake Countdown": ["Your order is reserved for", "offer ends in", "countdown", "Flash sale: ending soon!",
                           "limited amount of time", "left at this price",
                           "Activate within", "Ends in", "Save 25\%\ on your entire order","Cart Expires In", "Prices increase in", 
                           "Today's sale ends in", "ENDS ONCE COUNTER HITS ZERO", "EXPIRES IN", " left to buy", "Please Order Within", "Days left until the offer ends", 
                           "Checkout within", " order within", "Complete your purchase within the next", "Items will be reserved in your cart for"],

        # Look for phrases that come under ConfirmShaming
        "Confirmshaming": ["No thanks, I don't like free stuff", "No thanks. I don't like free things",
                           "Yes, I want to save money - who wouldn't?", "No, I don't care about my privacy",
                           "Sure, continue being wasteful",
                           "No, I prefer paying more for no reason", "Yes, I love missing out on great deals",
                           "No, I'd rather not be a smart shopper", "Yes, I enjoy making bad choices",
                           "Sure, ignore this incredible offer", "No, I don't want to be a savvy consumer", "I don't like discounts", "no thanks, I like paying full price", 
                           "No Thanks, I Prefer Paying Full Price", "No thanks, I don't like good deals", "No I don't feel lucky", "No thanks, I'll skip this amazing super-saver deal",
                           "No thanks, I'd like 0\%\ off", "No Thanks, I Don't Like Exclusive Offers"],

        # Look for phrases like “only” and “units left”
        "Scarcity": ["pieces of items left in stock", "Time is running out! Buy now", "Act now before it's too late!",
                     "Limited stock remaining", "Hurry, only a few items left", "Almost sold out! Act fast!",
                     "Popular choice! Act quickly",  "Claimed! Hurry, only a few left!", "limited quantity left", "No restock", "offer ends on",
                     "LEFT", "limited availability at this price", "SELLING FAST", "An item you ordered is in high demand. No worries, we have reserved your order", 
                     "Will sell out fast","it's too late", "HIGH DEMAND", "ONCE IT'S GONE, IT'S GONE", "Our items sell fast, don't miss out", "SELLING OUT QUICKLY",
                     "selling fast", "Sale ends soon", "Limited Time", ""],
    }

    result = find_dp_in_websites(url_link, search_dp_to_find)
    print(result)

    # update a jira ticket
    update_issue_dp(issueData,result)

    return

