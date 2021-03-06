/* Les assets, on pourra plus tard ajouter des sons et des musiques */
const assetsToLoadURLs = {

    glowstone: { url: "assets/images/glowstone.png" },
    squelette: { url: "assets/images/squelette.png" },
    enderman: { url: "assets/images/enderman.png" },

    scream: {
        url:
            "assets/audio/scream.mp3",
        buffer: false,
        loop: false,
        volume: 0.3,
    },
    coin: {
        url:
            "assets/audio/coin.mp3",
        buffer: false,
        loop: false,
        volume: 0.2,
    },
    musique_jeu_en_cours: {
        url:
            "assets/audio/musique_jeu_en_cours.mp3",
        buffer: true,
        loop: true,
        volume: 0.5,
    },
    musique_menu_principal: {
        url:
            "assets/audio/musique_menu_principal.mp3",
        buffer: true,
        loop: true,
        volume: 1.0,
    },
    musique_game_over: {
        url:
            "assets/audio/musique_game_over.mp3",
        buffer: true,
        loop: true,
        volume: 0.8,
    },
};

function loadAssets(callback) {
    // here we should load the souds, the sprite sheets etc.
    // then at the end call the callback function
    loadAssetsUsingHowlerAndNoXhr(assetsToLoadURLs, callback);
}

// You do not have to understand in details the next lines of code...
// just use them!

/* ############################
    BUFFER LOADER for loading multiple files asyncrhonously. The callback functions is called when all
    files have been loaded and decoded 
 ############################## */
function isImage(url) {
    return url.match(/\.(jpeg|jpg|gif|png)$/) != null;
}

function isAudio(url) {
    return url.match(/\.(mp3|ogg|wav)$/) != null;
}

function loadAssetsUsingHowlerAndNoXhr(assetsToBeLoaded, callback) {
    var assetsLoaded = {};
    var loadedAssets = 0;
    var numberOfAssetsToLoad = 0;

    // define ifLoad function
    var ifLoad = function () {
        if (++loadedAssets >= numberOfAssetsToLoad) {
            callback(assetsLoaded);
        }
        console.log("Loaded asset " + loadedAssets);
    };

    // get num of assets to load
    for (var name in assetsToBeLoaded) {
        numberOfAssetsToLoad++;
    }

    console.log("Nb assets to load: " + numberOfAssetsToLoad);

    for (name in assetsToBeLoaded) {
        var url = assetsToBeLoaded[name].url;
        console.log("Loading " + url);
        if (isImage(url)) {
            assetsLoaded[name] = new Image();

            assetsLoaded[name].onload = ifLoad;
            // will start async loading.
            assetsLoaded[name].src = url;
        } else {
            // We assume the asset is an audio file
            console.log(
                "loading " + name + " buffer : " + assetsToBeLoaded[name].loop
            );
            assetsLoaded[name] = new Howl({
                urls: [url],
                buffer: assetsToBeLoaded[name].buffer,
                loop: assetsToBeLoaded[name].loop,
                autoplay: false,
                volume: assetsToBeLoaded[name].volume,
                onload: function () {
                    if (++loadedAssets >= numberOfAssetsToLoad) {
                        callback(assetsLoaded);
                    }
                    console.log("Loaded asset " + loadedAssets);
                },
            }); // End of howler.js callback
        } // if
    } // for
} // function