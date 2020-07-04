<?php
include_once("config.php");
$title = str_replace("_"," ",$_GET["title"]);
$sql = 'SELECT thumb_url FROM presentations WHERE title="'.$title.'"';
$result = mysqli_query($link, $sql);

while ($row = mysqli_fetch_array($result)) {
    $url =  $row['thumb_url'];
}
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="Presentation about <?php echo $title ?> by Presentation Generator">
    <meta property="og:image" content="<?php echo $url ?>">
    <title><?php echo $title ?> | Presentation Generator</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css"
        integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS" crossorigin="anonymous">
    <link rel="stylesheet" href="style.css">
</head>

<body>
    <span hidden id="title"><?php echo $_GET["title"];?></span>
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
                    <a class="nav-link" href="#">PowerPoint | PDF</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="https://en.wikipedia.org/wiki/<?php echo $_GET["title"]; ?>"
                        target="_blank">Wikipedia Article</a>
                </li>
            </ul>
        </div>
    </nav>
    <h1 class="align-self-center py-3 text-center dark-back"><?php echo $title?></h1>
    </div>
    <div class="w-100 container main py-3">
        <h2 class="mt-3"></h2>
        <div class="google py-3">
            <button class="btn btn-primary" id="authorize_button">Download to Google Slides <img height="38"
                    src="/images/google-icon.png"></button>
        </div>
        <!--CARD-->
        <div class="w-100 d-flex justify-content-center">
            <div class="card pres-preview text-center" style="width: 18rem; display: none">
                <img src="<?php echo $url ?>" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title"><?php echo $title ?></h5>
                    <p class="card-text"></p>
                    <a target="__blank" href="https://docs.google.com/presentation/" class="btn btn-dark">View in Google Slides</a>
                </div>
            </div>
        </div>


        <div class="progress">
            <div class="progress-bar" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
                Creating the presentation...</div>
        </div>
        <div class="jumbotron error">
            <h3 class="display-4">Error</h3>
            <p class="lead">Uknown error</p>
            <hr class="my-4">
            <p>Try again or take another article</p>
            <button class="btn btn-dark" onClick="window.location.reload();" role="button">Try again</button>
            <a class="btn btn-secondary" href="index.php" role="button">Search another article</a>
        </div>
        <p>Presentation about <?php echo str_replace("_"," ",$_GET["title"])?> is ready for you to download. Just sign
            in via Google and wait until the presentation is generating!</p>
            <button class="btn btn-dark" data-toggle="modal" data-target="#modal">Report error</button>
    </div>
    <div class="dark-back py-3">
        <div class="container">
            <h3>Check out some other presentations:</h3>
            <div class="random-presentations">
                <?php
        $sql2 = 'SELECT * FROM `presentations` ORDER BY RAND() LIMIT 20';
        $result2 = mysqli_query($link, $sql2);
        while ($row2 = mysqli_fetch_array($result2)) { ?>
                <a href="../<?php echo str_replace(" ","_",$row2["title"]); ?>">
                    <div>
                        <img src="<?php echo $row2["thumb_url"]; ?>" class="card-img-top" alt="...">
                        <h5><?php echo $row2["title"]; ?></h5>
                    </div>
                </a>
                <?php } ?>
            </div>
        </div>
    </div>

    <div class="modal fade" id="modal" tabindex="-1" role="dialog" aria-labelledby="modal" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Error report</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
      <div class="form-group">
    <label for="exampleFormControlTextarea1">Describe error</label>
    <textarea class="form-control" id="error-description" rows="3" placeholder="slide number, object..."></textarea>
  </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" id="submitError">Submit</button>
      </div>
    </div>
  </div>
</div>

<?php include_once("footer.php"); ?>
    <script src="https://code.jquery.com/jquery-3.4.1.min.js"
        integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo=" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/js/bootstrap.min.js"
        integrity="sha384-B0UglyR+jN6CkvvICOB2joaf5I4l3gm9GU6Hc1og6Ls7i6U/mkkaduKaBhlAXv9k" crossorigin="anonymous">
    </script>
    <script src="js/variables.js"></script>
    <script src="js/basicfunctions.js"></script>
    <script src="js/images.js"></script>
    <script src="js/texts.js"></script>
    <script src="js/googlejson.js"></script>
    <script src="js/sorters.js"></script>
    <script src="js/infogetters.js"></script>
    <script src="js/creation.js"></script>
    <script src="js/googleapi.js"></script>
    <script src="js/index-gen.js"></script>
    <script defer src="https://apis.google.com/js/api.js" onload="this.onload=function(){};handleClientLoad()"
        onreadystatechange="if (this.readyState === 'complete') this.onload()">
    </script>
</body>

</html>