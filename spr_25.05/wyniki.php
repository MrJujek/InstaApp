<?php
    if(isset($_GET['id_stacji']) && isset($_GET['ocena'])) {
        // var_dump($_GET);
        $id_stacji = $_GET['id_stacji'];
        $ocena = $_GET['ocena'];

        $conn = new mysqli('localhost', 'root', '', 'jd_spr');
        $res1 = mysqli_query($conn, 'INSERT INTO `oceny`(`id_stacji`, `ocena`) VALUES ('.$id_stacji.','.$ocena.')');

        $res2 = mysqli_query($conn, 'SELECT id_stacji, ocena FROM oceny');

        $srednia = [];
        for($i = 1; $i <= 20; $i++) {
            $srednia[$i] = [0,0];

            // ileocen | oceny
        }

        // echo "<pre>";
        

        while ($row = mysqli_fetch_row($res2)) {
            for($i = 1; $i <= 20; $i++) {
                if ($row[0]==$i) {
                    $srednia[$i][0]++;
                    $srednia[$i][1] += $row[1];
                }
            }
            //  var_dump($row);
        }

        // var_dump($srednia);

        $srednia_ocen = [];
        for ($i = 1; $i <= 20; $i++) {
            if ($srednia[$i][1] != 0) {
                $srednia_ocen[$i] = $srednia[$i][1] / (float) $srednia[$i][0];
            } else {
                $srednia_ocen[$i] = (float) 0;
            }
        }
        // var_dump($srednia_ocen);

        $top1 = [1,0];
        $top2 = [2,0];
        $top3 = [3,0];

        for ($i = 1; $i <= 20; $i++) {
            if ($srednia_ocen[$i] > $top1[1]) {
                $top1 = [$i, $srednia_ocen[$i]];
            } else  if ($srednia_ocen[$i] > $top2[1]) {
                $top2 = [$i, $srednia_ocen[$i]];
            } else if ($srednia_ocen[$i] > $top3[1]) {
                $top3 = [$i, $srednia_ocen[$i]];
            }
        }
        // for ($i = 1; $i <= 20; $i++) {
        //     if ($srednia_ocen[$i] > $top1[1]) {
        //         $top1 = [$i, $srednia_ocen[$i]];
        //     } else  if ($srednia_ocen[$i] > $top2[1]) {
        //         if ($top1[0] != $i) {
        //             $top2 = [$i, $srednia_ocen[$i]];
        //         }
        //     } else if ($srednia_ocen[$i] > $top3[1]) {
        //         if ($top2[0] != $i) {
        //             $top3 = [$i, $srednia_ocen[$i]];
        //         }
        //     }
        // }
        // var_dump($srednia_ocen);

        print("Ocena zostala dodana, zobacz ranking:");
        print("<table border=1>");
        print("<tr><th>Nazwa stacji</th><th>Srednia ocen</th></tr>");
        $res2 = mysqli_query($conn, 'SELECT nazwa FROM stacje WHERE id_stacji='.$top1[0]);
        while ($row = mysqli_fetch_row($res2)) {
                print("<tr>");
                print("<td>".$row[0]."</td>");
                print("<td>".$top1[1]."</td>");
                print("</tr>");
        }
        $res2 = mysqli_query($conn, 'SELECT nazwa FROM stacje WHERE id_stacji='.$top2[0]);
        while ($row = mysqli_fetch_row($res2)) {
                print("<tr>");
                print("<td>".$row[0]."</td>");
                print("<td>".$top2[1]."</td>");
                print("</tr>");
        }
        $res2 = mysqli_query($conn, 'SELECT nazwa FROM stacje WHERE id_stacji='.$top3[0]);
        while ($row = mysqli_fetch_row($res2)) {
                print("<tr>");
                print("<td>".$row[0]."</td>");
                print("<td>".$top3[1]."</td>");
                print("</tr>");
        }
        print("</table><br>");
    }
?>