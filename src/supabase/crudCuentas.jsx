import { supabase } from "../index";

export const MostrarCuentas = async (p) => {
  try {
    const { data } = await supabase
      .from("cuenta")
      .select()
      .eq("id_usuario", p.id_usuario)
      .maybeSingle();
    
    if (data) {
      return data;
    }

    return data;
  } catch (error) {
    alert(error.error_description || error.message + " MostrarCuentas");
  }
}
