<?php
    $conn = new mysqli('localhost', 'root', '', 'jd_spr');
    $res = mysqli_query($conn, 'SELECT nazwa, id_stacji, orczyki, krzeselka, `gondole/kolejki`,nasniezanie,oswietlenie  FROM stacje');
    // print("<pre>");
    print("<table border='1'>");
    print("<tr><th>Nazwa stacji</th><th>L. wyciagow</th><th>Nasniezanie</th><th>Oswietlenie</th></tr>");
    while ($row = mysqli_fetch_row($res)) {
        #var_dump($row);
        #print ($row[2]+$row[3]+$row[4]."<br>");
        print("<tr>");
        print("<td><a href='trasy.php?id=$row[1]'>".$row[0]."</a></td>");
        print("<td>".($row[2]+$row[3]+$row[4])."</td>");
        print("<td>$row[5]</td>");
        print("<td>$row[6]</td>");
        print("</tr>");
    }
    #print("</table>");
    $conn -> close();
?>