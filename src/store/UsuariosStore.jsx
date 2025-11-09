import { create } from 'zustand'
import { EditarTemaMonedaUser, MostrarUsuarios } from '../index'

export const useUsuariosStore =  create((set, get) => ({
  id_usuario: null,
  id_auth_supabase: null,
  dataUsuarios: [],
  mostrarUsuarios: async () => {
    const usuarios = await MostrarUsuarios()
    if(usuarios) {
      set({ dataUsuarios: usuarios })
      set({ id_usuario: usuarios.id })
      set({ id_auth_supabase: usuarios.id_auth_supabase })
      return usuarios;
    } else {
      return []
    }    
  },
  editarTemaMonedaUser: async(p) => {    
    await EditarTemaMonedaUser(p)
    const {mostrarUsuarios} = get();
    set(mostrarUsuarios)
  }
}))