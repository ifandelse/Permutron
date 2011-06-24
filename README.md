# Permutron

A while back I needed a way to generate unique ids on the client-side using JavaScript.  I wrote Permutron to provide a simple utility to allow me to have as many ids as necessary.
Permutron simply returns the next id in a sequence that you configure.  It does *not* have any knowledge of *what* you are applying the ids to, and it will not be persistent between
browser sessions.  (In my use case, I needed ids that were unique for the life of the user's session.)

# How to use it
* First, include the Permutron.js file in your page.
* "New" up a Permutron object.
* Permutron takes 3 arguments, **only the first one is required**
    * maxIdLength - the max number of characters you want the id to reach.
    * isFixed - if you always want your id to be the length you specified as maxIdLength, this should be true.  If set to false, the ids will start as 1 character and work up to your maxIdLength.  **It defaults to false.**
    * charset - the list of characters you want to use as the pool of characters for the generator.  **It defaults to [a-zA-Z].**
* As you need ids, call "next()"
* You can also access the total ids possible with the configuration you provided by calling "maxIdsPossible()"
* Your Permutron object will set "depletedAvailableIds" to true when it has exhausted the possible permutations.

### JavaScript ###
    // Set up a Permutron, up to 5 character length Ids, variable width:
    var defaultPermutron = new Permutron(5);

    // How many can this guy generate?
    var totalIdsPossible = defaultPermutron.maxIdsPossible();

    // when you need a new id
    var id = defaultPermutron.next();

    // But what if I want to use only "ABCDE" as the character set
    // *and* I want my ids to always be 7 chars long?
    var otherPermutron = new Permutron(7, true, "ABCDE");
