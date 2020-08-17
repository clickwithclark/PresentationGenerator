<?php
include_once("config.php");
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="Free online presentation generator! Download premade presentation is now easy and free! You can dowload premade slides in pptx(PowerPoint), Google Slides, .pdf (PDF), .txt and .odp (ODP) formats!">
    <meta property="og:image" content="https://presentationgenerator.ru/images/logo.png">
    <title>Presentation Generator - download premade presentation on any topic!</title>
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
                    <a class="nav-link" href="tutorial.php">Tutorial</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="https://presentationgenerator.ru">РУС</a>
                </li>
            </ul>
        </div>
    </nav>

    <section class="container starting py-3">
        <div class="w-100 ">
            <h1 class="text-center">Presentation Generator</h1>
            <div class="input-group mt-3">
                <input type="text" class="form-control" id="mainInput" placeholder="Enter theme of presentation"
                    name="task">
                <div class="input-group-prepend">
                    <button type="button" class="btn btn-dark" id="submit">
                        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1"
                            id="Layer_1" x="0px" y="0px" viewBox="0 0 512 512"
                            style="enable-background:new 0 0 512 512;" xml:space="preserve" width="20px" height="20px"
                            class="">
                            <g>
                                <g>
                                    <g>
                                        <path
                                            d="M508.875,493.792L353.089,338.005c32.358-35.927,52.245-83.296,52.245-135.339C405.333,90.917,314.417,0,202.667,0    S0,90.917,0,202.667s90.917,202.667,202.667,202.667c52.043,0,99.411-19.887,135.339-52.245l155.786,155.786    c2.083,2.083,4.813,3.125,7.542,3.125c2.729,0,5.458-1.042,7.542-3.125C513.042,504.708,513.042,497.958,508.875,493.792z     M202.667,384c-99.979,0-181.333-81.344-181.333-181.333S102.688,21.333,202.667,21.333S384,102.677,384,202.667    S302.646,384,202.667,384z"
                                            data-original="#000000" class="active-path" data-old_color="#000000"
                                            fill="#FFFFFF" />
                                    </g>
                                </g>
                            </g>
                        </svg>
                    </button>
                </div>
            </div>
            <div class="list-group suggestions mt-3">

            </div>
        </div>
    </section>
    <section class="dark-back py-3">
        <div class="container">
            <h2 class="text-left">Pick up any topic.</h2>
            <div class="google-slides-container">
                <iframe
                    src="https://docs.google.com/presentation/d/e/2PACX-1vTU4i51mWMH_R0wmUdNhduWHjex5vg_B8eTfpRuSSAJ9Kbzzi8cD-UKTopbdfWgW7WjMI-oTFhEY_5S/embed?start=false&loop=false&delayms=3000"
                    frameborder="0" width="100%" height="569" allowfullscreen="true" mozallowfullscreen="true"
                    webkitallowfullscreen="true" id="#if"></iframe>
            </div>
            <br>
            <div class="row">
                <div class="col-md-8">
                    <p>This is online Presentation Generator. You can generate and download prepared presentations on any topic! You can download <b>Google Slides</b>, 
                        <b>PowerPoint</b>, <b>PDF</b> or <b>Keynote</b>. Just enter the topic and download slides!
                    </p>
                </div>
                <div class="col-md-4">
                    <a href="/Alexander_the_Great" class="btn btn-light">Get this presentation</a>
                    <button class="btn btn-primary generate-btn navbar-text mt-3">Generate your one

                        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                            x="0px" y="0px" viewBox="0 0 326.387 326.387"
                            style="enable-background:new 0 0 326.387 326.387;" xml:space="preserve" height=30px>
                            <polygon
                                points="252.086,178.355 171.154,144.27 231.9,0 74.301,148.018 155.236,182.104 94.487,326.387 " />
                            <g>
                            </g>
                            <g>
                            </g>
                            <g>
                            </g>
                            <g>
                            </g>
                            <g>
                            </g>
                            <g>
                            </g>
                            <g>
                            </g>
                            <g>
                            </g>
                            <g>
                            </g>
                            <g>
                            </g>
                            <g>
                            </g>
                            <g>
                            </g>
                            <g>
                            </g>
                            <g>
                            </g>
                            <g>
                            </g>
                        </svg>
                    </button>
                </div>

            </div>

        </div>
    </section>
    <section class="container pt-3">
        <h2 class="text-center">Download, Edit, Show.</h2>
        <p>Use generated presentation as a base. Delete extra stuff and add what's missing. Choose theme, adjust blocks
            and your awesome presentation is ready to be shown!</p>
        <img src="images/change-theme.png" class="w-100">
        <div class="text-center py-3">
            <div>
                <a href="/Giant_Panda" class="btn btn-dark mb-3">Get an awesome presentation about pandas</a>
                <button class="btn btn-primary generate-btn navbar-text ml-3 mb-3">Generate your one

                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                        x="0px" y="0px" viewBox="0 0 326.387 326.387" style="enable-background:new 0 0 326.387 326.387;"
                        xml:space="preserve" height=30px>
                        <polygon
                            points="252.086,178.355 171.154,144.27 231.9,0 74.301,148.018 155.236,182.104 94.487,326.387 " />
                        <g>
                        </g>
                        <g>
                        </g>
                        <g>
                        </g>
                        <g>
                        </g>
                        <g>
                        </g>
                        <g>
                        </g>
                        <g>
                        </g>
                        <g>
                        </g>
                        <g>
                        </g>
                        <g>
                        </g>
                        <g>
                        </g>
                        <g>
                        </g>
                        <g>
                        </g>
                        <g>
                        </g>
                        <g>
                        </g>
                    </svg>
                </button>
            </div>
        </div>
    </section>

    <section class="py-3" style="border-top: 17px solid #ffffff;border-bottom: 17px solid #ffffff;">
        <div class="container">
            <h3>>6.000.000 possible presentations</h2>
                <p>The biggest presentation library in the world.</p>
        </div>
        <div class="all-presentations">
            <?php
        $sql2 = 'SELECT * FROM `presentations` ORDER BY `id` DESC LIMIT 90';
        $result2 = mysqli_query($link, $sql2);
        $count = 0;
        while ($row2 = mysqli_fetch_array($result2)) { 
            if ($count % 30 == 0 && $count > 0) { ?>
        </div>
        <div class="all-presentations">
            <?php } ?>
            <div class="single">
                <a href="../<?php echo str_replace(" ","_",$row2["title"]); ?>" class="pres-link">
                    <div><?php echo $row2["title"]; ?></div>
                </a>
            </div>
            <?php
            $count++;
            } ?>
        </div>
    </section>

    <?php include_once("footer.php"); ?>

    <script src="https://code.jquery.com/jquery-3.4.1.min.js"
        integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo=" crossorigin="anonymous">
    </script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/js/bootstrap.min.js"
        integrity="sha384-B0UglyR+jN6CkvvICOB2joaf5I4l3gm9GU6Hc1og6Ls7i6U/mkkaduKaBhlAXv9k" crossorigin="anonymous">
    </script>
    <script src="js/keypress.js"></script>
    <script src="js/variables.js"></script>
    <script src="js/infogetters.js"></script>
    <script src="js/blockpasters.js"></script>
    <script src="js/index.js"></script>
    <script src="js/layout.js"></script>

</body>

</html>