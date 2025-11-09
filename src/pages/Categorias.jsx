import React from 'react'
import { 
  CategoriasTemplate, 
  SpinnerLoader, 
  useCategoriasStore,
  useUsuariosStore,
  useOperaciones,
} from '../index'
import { useQuery } from '@tanstack/react-query'

export const Categorias = () => {
  const { dataUsuarios } = useUsuariosStore()
  const { datacategoria, mostrarCategorias } = useCategoriasStore()
  const { tipo } = useOperaciones()
  const { isLoading, error } = useQuery({
    queryKey: ["mostrar categorias", tipo],
    queryFn: () => mostrarCategorias({ id_usuario: dataUsuarios.id, tipo: tipo })
  })

  if(isLoading) <SpinnerLoader />

  if(error) {
    return <h1>Error...</h1>
  }

  return (    
    <CategoriasTemplate data={datacategoria} />    
  )
}
