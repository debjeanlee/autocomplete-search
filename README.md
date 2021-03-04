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

### Planning and Development Process

I started by going through the Github Search API documentation, and upon further reading found out that there are several types of searches that one can perform using the API:

- Code
- Commits
- Issues
- Labels
- Repositories
- Topics
- Users

Taking the number of categories into account, I then designed and styled my app according to how what I thought would create the least friction for users, while returning as many results as possible based on the search.

I decided on a no-frills layout with just a search bar on the landing page, and only after searching would it show the different categories of searches.
![landing page](/readme/img1.png)
![result page](/readme/img2.png)
![result page bottom](/readme/img3.png)

Upon digging further into the Github API Search docs, I noticed that some of the end points were still under preview and subject to change, so I decided to leave them out for app longevity. The labal search endpoint was also left out because it required using repository id in the request and you couldn't use it with just a search term.

Based on these considerations, I moved forward to first displaying search results from a query.

I realised each endpoint had very different data types coming through so I would need to find a way to customize my result item component to allow me to reuse it multiple times - which led me to use a switch statement inside the component so it would render according to what category was currently active.

Once I could display the results, I then moved on to the functionality of the autocomplete search bar.

While testing the autocomplete function, I realised I was exceeding the rate limit for the API because I set it to trigger calls everytime my field input changed. To counter this, I delayed the updating of the autocomplete search term. Using the setTimeOut function, I delayed setting the search term that triggers the API call by 2.5s to counter the rate limit problem.

After getting the autocomplete results, I realised there were a lot of results with weird symbols and such, so I decided to filter and sort according to words or titles whose first few letters matched the search term's, then only render the autocomplete results on screen.

I decided to show autocomplete results based on top 8 matches from only the repository and user end points. My reason for doing this was because, as a user, I would use searches to look for things like:

- Users
- Repository names
- A specific language

Since I was calling the API then sorting the results and removing duplicates, it meant looping through the results several times to get to what I wanted. This is why I limited the autocomplete results to the repository and user end points, as I thought these things would contain the most variety of names or titles to provide more comprehensive results for the autocomplete function, without affecting the performance of the sorting and filtering functions.

This is the final result! Autocomplete for "javasc" shown here:
![search javascr](/readme/img4.png)

## Post Mortem

- Perhaps should have stored previous user searches in local storage to get faster and more relevant matches to the user in the autocomplete box? Doing this would have allowed me to set the delay to a longer time for the autocomplete search triggering the API call, but also would reduce user friction by remembering old searches that the user made - which the user is likely to search for again.
- I should have left the current search input inside the search box upon searching - in case user made a typo it's easier to correct.
- Should include a match-by selector so users can choose how they want to filter their results? Based on best match, stars, recently updated, etc..
- Would improve the pagination by putting maybe the first and last page number instead of just arrows so users can see how many pages there are, and also include an option for users to choose how many results they want to see?
- Not sure if limiting the number of results from 20 to 8 per request had any significant impact on the autocomplete search performance.. Need to into optimizing performance.
