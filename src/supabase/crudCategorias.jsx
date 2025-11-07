import { supabase } from '../index'
import Swal from 'sweetalert2'

export const InsertarCategorias = async (p) => {
  try {
    const { data, error } = await supabase
      .from("categorias")
      .insert(p)
      .select();
    if(error) {
      Swal.fire({
        icon: "error",
        title: "Ops!",
        text: "Ya existe un registro con " + p.descripcion,
        footer: '<a href="">Agregue una nueva descripción</a>'
      })
    }
    if(data) {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Datos guardados',
        showConfirmButton: false, 
        timmer: 2500
      })
    }    
  } catch(error) {
    alert(error.error_description || error.message + " insertar categorias");
  }
}

export async function MostrarCategorias(p) {
  try {
    const { data } = await supabase
      .from("categorias")
      .select()
      .eq("id_usuario", p.id_usuario)
      .eq("tipo", p.tipo)
      .order("id", { ascending: false });
    return data;
  } catch (error) {
    alert(error.error_description || error.message + " mostrar categorias");
  }
}

export async function EliminarCategorias(p) {
  try {
    const { error } = await supabase
      .from("categorias")
      .delete()
      .eq("id_usuario", p.id_usuario)
      .eq("id", p.id);
    if (error) {
      alert("Error al eliminar", error);
    }
  } catch (error) {
    alert(error.error_description || error.message + " eliminar categorias");
  }
}

export async function EditarCategorias(p) {
  try {
    const { error } = await supabase
      .from("categorias")
      .update(p)
      .eq("id_usuario", p.id_usuario)
      .eq("id", p.id);
    if (error) {
      alert("Error al editar categoria", error);
    }
  } catch (error) {
    alert(error.error_description || error.message + " editar categorias");
  }
}

export async function EliminarCategoriasTodas(p) {
  try {
    const { error } = await supabase
      .from("categorias")
      .delete()
      .eq("idusuario", p.idusuario)
    if (error) {
      alert("Error al eliminar", error);
    }
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Datos reseteados",
      showConfirmButton: false,
      timer: 1000,
    });
  } catch (error) {
    alert(error.error_description || error.message + " eliminar categorias");
  }
}