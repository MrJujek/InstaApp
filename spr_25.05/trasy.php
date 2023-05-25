<?php
    if(isset($_GET['id'])) {
        $id = $_GET['id'];
        $conn = new mysqli('localhost', 'root', '', 'jd_spr');
        $res1 = mysqli_query($conn, 'SELECT nazwa FROM stacje WHERE id_stacji='.$id);
        
        while ($row = mysqli_fetch_row($res1)) {
            print("Stacja narciarska: ".$row[0]);
        
        }

        $res2 = mysqli_query($conn, 'SELECT nazwa, dlugosc FROM trasy WHERE id_stacji='.$id);
        print("<table border=1>");
        print("<tr><th>Nazwa trasy</th><th>Dlugosc</th></tr>");
        while ($row = mysqli_fetch_row($res2)) {
            print("<tr>");
            print("<td>".$row[0]."</td>");
            print("<td>".$row[1]."</td>");
            print("</tr>");
        }
        print("</table><br>");

        print("Ocen stacje:");
        print("<form method='GET' action='wyniki.php'>");
        print('
        <input type="hidden" name="id_stacji" value='.$id.'>
        <input type="radio" name="ocena" value="1">1<br>
        <input type="radio" name="ocena" value="2">2<br>
        <input type="radio" name="ocena" value="3">3<br>
        <input type="radio" name="ocena" value="4">4<br>
        <input type="radio" name="ocena" value="5">5<br>
        <input type="radio" name="ocena" value="6">6<br>
        <button type="submit">Ocen</button>');
        print("</form>");
    }
    $conn -> close();
?>