<?php
    $data = file_get_contents("php://input");
    require ("../config/conexion.php");
    $consulta = $pdo->prepare("SELECT * FROM productos ORDER BY id ASC");
    $consulta->execute();
    if ($data != ""){
        $consulta = $pdo->prepare("SELECT * FROM productos WHERE id LIKE '%".$data."%' OR producto LIKE '%".$data."%' OR precio LIKE '%".$data."%'");
        $consulta->execute();
    }
    $resultado = $consulta->fetchAll(PDO::FETCH_ASSOC);
    foreach ($resultado as $data){
        echo "<tr>
            <td>".$data['codigo']."</td>
            <td>".$data['producto']."</td>
            <td>".$data['precio']."</td>
            <td>".$data['cantidad']."</td>
            <td>
                <button type='button' class='btn btn-success' onclick=Editar('".$data['id']."')><i class='fas fa-edit'></i></button>
                <button type='button' class='btn btn-danger' onclick=Eliminar('".$data['id']."')><i class='fas fa-trash-alt'></i></button>
            </td>
        </tr>";
    }
?>