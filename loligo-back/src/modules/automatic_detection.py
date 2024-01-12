import urllib.request
import re

#TODO: identify which dark patterns can be detected automatically 
#https://arrow.tudublin.ie/cgi/viewcontent.cgi?article=1162&context=scschcomart

# domain base veification 
url = 'https://polipetto.pp.ua'
website = urllib.request.urlopen(url)

# Read HTML code
html = website.read().decode('utf-8')

# Use re.findall to get all the links
links = re.findall('\"((http|ftp)s?://.*?)\"', html)

# Filter the links based on the base URL
base_url = url
filtered_links = [link for link in links if base_url in link[0]]

# Print the filtered links
for link in filtered_links:
    print(link[0])
