# Angular Assignment for TapChief

You are required to interface with the paginated api at /api/photos?page=1 and develop an infinite scroll component in angular 7. Fork this repo on github and start working on it and once you are done simply raise a pull request to the parent repo.

## Set up details

*  npm i && ng serve
* `npm run server` to run the express server that exposes the paginated API on localhost:5000

## Implementation details

private itemHeight = 60;
private numberOfItems = 50; // per page

Infinite scroll as a feature is used to reduce the load on the frontend while loading long paginated results while not hindering the user experience. Whenever the user scrolls through more than 80% of the content request for more by passing the next page number to the PHOTOS API.

`You are required to use only RxJS to implement this feature and ensure that you never ever subscribe`

For those of you reading this, who are unaware of RxJS, the fundamental rule is never to subscribe until absolutely required as this can lead to unwanted memory leaks over time. Always you RxJS Operators to transform any stream to your liking or even combine two stream into one.

`Infinite scroll can be triggered by a user scroll or by a window resize and you must handle both conditions`

+ First you must create 2 observables resize$ and scroll$ from the respective events
+ Next create a pageByScroll$ and pageByResize$ by transforming the respective event streams into page numbers based on the item height. (You could use a simple map operator here)
+ Since the bothe events can  technically request a page load , Combine the two streams to create a new pageToLoad$ stream.
+ At this point you could ideally subscribe get the page number and make an http call to get the right page but then again since http also returns an observable why subscribe unless absolutely required?
+ So instead transform the pageToLoad$ stream to a results$ stream that you can ngFor on after using the async pipe (This ensures that we never ever subscribe manually)

## `Bonus points` 

* If you can implement some kind of caching on the frontend in-case that particular page was already loaded`
* If you can optimise for ChangeDetection when you load more than 1000 items in ngFor
* For separating concerns using stateful and stateless components and for following other best practices in Angular
