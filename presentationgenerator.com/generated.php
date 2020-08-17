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
                    <a class="nav-link" href="tutorial.php">Tutorial</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="https://en.wikipedia.org/wiki/<?php echo $_GET["title"]; ?>"
                        target="_blank">Wikipedia Article</a>
                </li>
            </ul>
        </div>
    </nav>
    </div>
    <div class="w-100 container main py-3">
        <div class="w-100 d-flex justify-content-center mb-3">
            <div class="description px-3 py-3 w-100">
                <img src="<?php echo $url ?>" class="vert-img">
                <div class="content">
                    <h1 class="pb-3"><?php echo $title ?></h1>
                    <img src="<?php echo $url ?>" class="w-100 mb-3 hor-img">
                    <div class="container">
                        <div class="row options mt-3">
                            <div class="col-sm">
                                <a href="#" class=" download link0">
                                    <h2>PowerPoint</h2>
                                </a>
                            </div>
                            <div class="col-sm mar">
                                <a href="#" class="link1 download">
                                    <h2>Google Slides</h2>
                                </a>
                            </div>
                            <div class="col-sm">
                                <a href="#" class="link2 download">
                                    <h3>PDF</h3>
                                </a>
                            </div>
                            <div class="w-100 space"></div>
                            <div class="col-sm">
                                <a href="#" class="link3 download">
                                    <h3>Text</h3>
                                </a>
                            </div>
                            <div class="col-sm mar">
                                <a href="#" class="link4 download">
                                    <h3>ODP</h3>
                                </a>
                            </div>
                            <div class="col-sm">
                                <a class="download" id="openModal">
                                    <h4>Send by email</h4>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="progress mt-3">
                        <div class="progress-bar" role="progressbar" aria-valuenow="75" aria-valuemin="0"
                            aria-valuemax="100">
                            Presentation is generating...</div>
                    </div>
                </div>
            </div>
        </div>

        <p>You can download premade presentation "<?php echo str_replace("_"," ",$_GET["title"])?>" absolutely free or send it by email. Just choose one of the 5 formats:</p> 
        <ul>
        <li><b>pptx (PowerPoint)</b>
        <li><b>Google Slides</b></li>
        <li><b>.pdf (PDF)</b></li>
        <li><b>.txt (Текст презентации)</b></li>
        <li><b>.odp (ODP)</b></li>
    </ul>
    </div>
    <div class="py-3">
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
                        <p><?php echo $row2["title"]; ?></p>
                    </div>
                </a>
                <?php } ?>
            </div>
        </div>
    </div>

    <div class="modal fade error-modal" id="errorModal" tabindex="-1" role="dialog" aria-labelledby="modal" aria-hidden="true">
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
<div class="modal fade" id="emailModal" tabindex="-1" role="dialog" aria-labelledby="emailModal" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalCenterTitle">Send presentation by email</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label for="exampleFormControlTextarea1">Enter the email. Download links will be sent to this email.</label>
                        <input class="form-control" id="email" rows="1" placeholder="Email">
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" id="sendEmail">Send</button>
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
    <script src="https://presentationgenerator.com/js/creation.js"></script>
    <script src="js/index-gen.js"></script>
    <script src="js/a.js"></script>
    <script src="https://apis.google.com/js/api.js"></script>
    <script src="js/googleapi.js"></script>
</body>

</html>