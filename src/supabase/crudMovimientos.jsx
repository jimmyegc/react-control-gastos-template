import { supabase } from "./supabase.config";
import Swal from "sweetalert2";

export const InsertarMovimientos = async (p) => {
  try {
    const { data, error } = await supabase
      .from("movimientos")
      .insert(p)
      .select();
    if (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Ya existe un registro con " + p.descripcion,
        footer: '<a href="">Agregue una nueva descripcion</a>',
      });
    }
    if (data) {
      Swal.fire({
        icon: "success",
        title: "Registrado",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  } catch (error) {
    alert(error.error_description || error.message + " insertar movimientos");
  }
};

export const EditarMovimientos = async (id, p) => {
  try {
    const { data, error } = await supabase
      .from("movimientos")
      .update(p)
      .eq("id", id)
      .select();

    if (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo actualizar el registro: " + error.message,
      });
      return;
    }

    if (data) {
      Swal.fire({
        icon: "success",
        title: "Actualizado correctamente",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  } catch (error) {
    alert(error.error_description || error.message + " editar movimientos");
  }
};


export async function EliminarMovimientos(p) {
  try {
    const { error } = await supabase
      .from("movimientos")
      .delete()
      .eq("id", p.id);
    if (error) {
      alert("Error al eliminar", error);
    }
  } catch (error) {
    alert(error.error_description || error.message + " eliminar movimientos");
  }
}

export const MostrarMovimientosPorMesAño = async (p) => {
  try {    
    const { data, error } = await supabase
    .rpc("m_movimientos_mes_anio", {
      anio: p.anio,
      mes: p.mes,
      p_id_usuario: p.p_id_usuario,
      tipocategoria: p.tipocategoria,
    });
    if(error) {
      console.log("Error MostrarMovimientosPorMesaño", error);      
    }
    return data;
  } catch (error) {
    alert(error.error_description || error.message + " MostrarMovimientosPorMesAño");
  }
}

export const RptMovimientosPorMesAño = async (p) => {
  try {
    const { data } = await supabase.rpc("rptmovimientos_anio_mes", {
      anio: p.anio,
      mes: p.mes,
      p_id_usuario: p.p_id_usuario,
      tipocategoria: p.tipocategoria,
    });
    return data;
  } catch (error) {
    alert(error.error_description || error.message + " RptMovimientosPorMesAño");
  }
}
