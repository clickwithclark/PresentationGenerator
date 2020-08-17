
<?php
include_once("config.php");
?>

<!DOCTYPE html>
<html lang="ru">
<head>
<script async src="https://www.googletagmanager.com/gtag/js?id=UA-164180494-1"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'UA-164180494-1');
</script>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="Бесплатный онлайн генератор презентаций. Скачать готовую презентацию по любой теме теперь быстро и бесплатно!">
    <meta property="og:image" content="https://presentationgenerator.ru/images/logoshare.png">
    <title>Бесплатный Генератор Презентаций - презентации на любую тему онлайн!</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css"
        integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS" crossorigin="anonymous">
    <link rel="stylesheet" href="https://presentationgenerator.com/style.css">
</head>

<body>
    <nav class="navbar navbar-expand-lg sticky-top">
        <a class="navbar-brand" href="index.php">
            <img src="images/logo.png" height="50" alt="Логотип Генератор Презентаций">
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
                    <a class="nav-link" href="tutorial.php">Обучение</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="https://presentationgenerator.com">ENG</a>
                </li>
            </ul>
        </div>
    </nav>

    <section class="container starting py-3">
        <div class="w-100 ">
            <h1 class="text-center">Генератор Презентаций</h1>
            <div class="input-group mt-3">
                <input type="text" class="form-control" id="mainInput" placeholder="Введите тему презентации"
                    name="task">
                <div class="input-group-prepend">
                    <button type="button" class="btn btn-dark" id="submit" aria-label="Найти презентацию"> 
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
            <h2 class="text-left">На любую тему.</h2>
            <div class="google-slides-container">
                <iframe src="https://docs.google.com/presentation/d/e/2PACX-1vSPNZ2ejIrvKgpOPtms-jAybejHq9i65mH_d185ICnGqolUcHe2XcPSRWXHUBqqmJWJa394c4Gb4LBp/embed?start=false&loop=false&delayms=3000" frameborder="0" width="100%" height="569" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"  id="#if"></iframe>


            </div>
            <br>
            <div class="row">
            <div class="col-md-8">
                    <p>Это генератор презентаций по тексту статей Википедии! Вы можете скачать <b>Google Slides</b> презентацию, а затем конвертировать в <b>PowerPoint</b>, PDF или <b>Keynote</b>. Просто введите тему и скачайте презентацию!
                    </p>
                </div>
                <div class="col-md-4">
                    <a href="/Культура_Древней_Руси" class="btn btn-light">Скачать эту презентацию</a>
                    <button class="btn btn-primary generate-btn navbar-text mt-3" aria-label="Сгенерировать свою презентацию">Сгенерировать свою

                        <svg version="1.1" xmlns="http://www.w3.org/2000/svg"
                            xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 326.387 326.387"
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
    <h2 class="text-center">Скачайте, Измените, Выступите.</h2>
        <p>Возьмите готовую презентацию за основу. Удалите ненужное и добавьте недостающее. Выберите тему, отрегулируйте параметры блоков и ваша отличная презентация готова! </p>
        <img 
        src="images/change-theme.png" 
         class="w-100" alt="Генератор презентаций изменить тему">

        <div class="text-center py-3">
            <div>
                <a href="/Белая_акула" class="btn btn-dark mb-3">Скачать эту классную презентацию про акул</a>
                <button class="btn btn-primary generate-btn navbar-text ml-3 mb-3" aria-label="Сгенерировать свою презентацию">Сгенерировать свою
                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 326.387 326.387"
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
    </section>

    <section class="py-3" style="border-top: 17px solid #ffffff;border-bottom: 17px solid #ffffff;">
        <div class="container">
        <h3>>1.000.000 возможных презентаций</h2>
        <p>Самое большое колличество презентаций в Рунете.</p>
</div>
<div class="all-presentations">
                <?php
        $sql2 = 'SELECT * FROM `rupresentations` ORDER BY `id` DESC LIMIT 90';
        $result2 = mysqli_query($link, $sql2);
        $count = 0;
        while ($row2 = mysqli_fetch_array($result2)) { 
            if ($count % 30 == 0 && $count > 0) { ?>
                </div><div class="all-presentations">
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