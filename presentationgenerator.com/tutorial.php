<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="How to use presentation generator.">
    <meta property="og:image" content="https://presentationgenerator.com/images/logoshare.png">
    <title>How to generate presentation? - Presentation Generator</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css"
        integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS" crossorigin="anonymous">
    <link rel="stylesheet" href="style.css">
</head>

<body>
    <nav class="navbar navbar-expand-lg sticky-top">
        <a class="navbar-brand" href="index.php">
            <img src="images/logo.png" height="50">
        </a>
        <button class="btn navbar-icon not-active navbar-toggler" type="button" data-toggle="collapse"
            data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span></span>
            <span></span>
            <span></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
            <li class="nav-item">
                    <a class="nav-link" href="powerpoint.php">PowerPoint | PDF</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="tutorial.php">Tutorial</a>
                </li>
            </ul>
        </div>
    </nav>

    <section class="container py-3">
        <div class="w-100 ">
            <h1 class="text-center">How to generate a presentation?</h1>
            <div class="google-slides-container">
                <iframe id="ytplayer" type="text/html" width="100%" height="360"
                    src="https://www.youtube.com/embed/FOWWoHXyK6M?autoplay=1&" frameborder="0"></iframe>
            </div>
        </div>
    </section>

    <?php include_once("footer.php"); ?>

    <script src="https://code.jquery.com/jquery-3.4.1.min.js"
        integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo=" crossorigin="anonymous">
    </script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/js/bootstrap.min.js"
        integrity="sha384-B0UglyR+jN6CkvvICOB2joaf5I4l3gm9GU6Hc1og6Ls7i6U/mkkaduKaBhlAXv9k" crossorigin="anonymous">
    </script>
</body>

</html>