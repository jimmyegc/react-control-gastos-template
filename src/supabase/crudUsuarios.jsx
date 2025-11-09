import Swal from 'sweetalert2';
import { supabase, ObtenerIdAuthSupabase } from '../index'

export const InsertarUsuarios = async (p) => {
  try {
    const { data } = await supabase
      .from("usuarios")
      .insert(p)
      .select();
    return data;  
  } catch(error) {
    alert(error.error_description || error.message + "InsertarUsuarios");        
  }
}

export const MostrarUsuarios = async () => {
  try {    
    const idAuthSupabase = await ObtenerIdAuthSupabase();
    const { data, error } = await supabase
      .from("usuarios")
      .select()
      .eq("id_auth_supabase", idAuthSupabase)
      .maybeSingle()      

/*     if(error) {
      alert("MostrarUsuarios", error)
    } */    
    
    if(data) {
      return data
    }
  } catch(error) {
    alert(error.error_description || error.message + "EditarTemaMonedaUser");    
  }
  
}

export const EditarTemaMonedaUser = async (p) => {
  try {    
    const { error } = await supabase
      .from("usuarios")
      .update(p)
      .eq("id", p.id)
    if (error) {
      console.log(error)
      alert("Error al editar usuarios", error);      
    } else {    
      Swal.fire({        
        icon: 'success',
        title: 'Datos modificados',
        showConfirmButton: false,
        timer: 2500
      })
    }
  } catch(error) {
    alert(error.error_description || error.message + "EditarTemaMonedaUser");    
  }
}