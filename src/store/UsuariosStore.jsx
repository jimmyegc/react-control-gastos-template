import { create } from 'zustand'
import { EditarTemaMonedaUser, MostrarUsuarios } from '../index'

export const useUsuariosStore =  create((set, get) => ({
  dataUsuarios: [],
  mostrarUsuarios: async () => {
    const usuarios = await MostrarUsuarios()
    if(usuarios) {
      set({ dataUsuarios: usuarios })
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