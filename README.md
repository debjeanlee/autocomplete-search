# Autocomplete Search Bar with Github API

Live preview: https://autocomplete-search.debjeanlee.com/

## Description
Implementing an autocomplete search bar in a single page React app, using the [Github Search API](https://docs.github.com/en/rest/reference/search).

Includes searches for:

- Code
- Issues
- Repositories
- Users

## Tech Used
- ReactJS
- Axios
- Github Search API
- CSS

## Development Process

### The Task
- To implement an autocomplete search bar in a SPA using the [Github Search API](https://docs.github.com/en/rest/reference/search)

### How I went about it
I started by going through the Github Search API documentation, and upon further reading found out that there are several types of searches that one can perform using the API: 
- Code
- Commits
- Issues
- Labels
- Repositories
- Topics
- Users

Taking the number of categories into account, I then designed and styled my app according to how what I thought would create the least friction for users, while returning as many results as possible based on the search.




Chose to leave out the fields that are under preview.

Autocomplete results based on top 8 matches from API results, then sorted with duplicates removed.

## 
