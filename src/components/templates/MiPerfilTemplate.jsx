import React, { useState, useEffect  } from 'react'
import Swal from "sweetalert2";
import styled from 'styled-components'
import { 
  Header,
  useUsuariosStore,
  InputImage,
  InputText,
  BtnSave,
  v,  
} from '../../index'
import { supabase } from "../../supabase/supabase.config";
import { useForm } from 'react-hook-form';

export const MiPerfilTemplate = () => {
  const { id_usuario, id_auth_supabase, mostrarUsuarios } = useUsuariosStore()
  const [openMenu, setOpenMenu] = useState(false)  
  const [uploading, setUploading] = useState(false);

  const { 
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
   } = useForm({
    defaultValues: { nombres: "", foto: "" },
  });
  
  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
    const { data: { user } } = await supabase.auth.getUser();

    const { data, error } = await supabase
      .from("usuarios")
      .select("nombres, foto")
      .eq("id", id_usuario)
      .single();

    if (!error && data) {
      reset(data);
    } else if (user?.user_metadata?.picture) {
      reset({
        nombres: user.user_metadata.full_name || "",
        foto: user.user_metadata.picture,
      });
    }
  };

   const handleUpload = async (file) => {
    try {
      setUploading(true);
      
      const fileExt = file.name.split(".").pop();
      const fileName = `${id_auth_supabase}.${fileExt}`;
      const filePath = `usuarios/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("archivos")
        .upload(filePath, file, { upsert: true });

      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from("archivos").getPublicUrl(filePath);      
      setValue("foto", data.publicUrl);
    } catch (error) {
      console.error("Error al subir la imagen:", error);
    } finally {
      setUploading(false);
    }
  };

  const onSubmit = async (values) => {    
    const updates = {
      id: id_usuario,
      nombres: values.descripcion,
      foto: values.foto,
      updated_at: new Date(),
    };

    const { error } = await supabase.from("usuarios").upsert(updates);
    if (error) console.error(error);
    else {
      mostrarUsuarios()
      Swal.fire({     
        icon: "success",
        title: "Perfil actualizado",
        showConfirmButton: false,
        timer: 1500,
      }); 
    }     
  };

  const fotoActual = watch("foto"); 
  const nombres = watch("nombres")
  
  return (
    <Container>
      <header className='header'>
        <Header stateConfig={{ state: openMenu, setState: () => setOpenMenu(!openMenu) }} />        
      </header>
      <section className='area1'>        
        <h1>Mi Perfil</h1>               
      </section>      
      <section className='area2'>          
        <form className="perfil-container"  onSubmit={handleSubmit(onSubmit)}>
          <div>
            <InputImage
              value={fotoActual}
              onUpload={handleUpload}
              disabled={uploading}
            />
          </div>          
          <div>
            <label>Nombre o Apodo:</label>
            <InputText
              name="nombres"
              defaultValue={nombres}
              register={register}
              placeholder="Nombre o Apodo"
              errors={errors}
              rules={{ required: true, minLength: 2 }}
              style={{ textTransform: "capitalize" }}
            />
          </div>
          

{/*           <div className="perfil-avatar">
            <img
              src={profile.foto || "/default-avatar.png"}
              alt="avatar"
              width="100"
              height="100"
              style={{ borderRadius: "50%" }}
            />
          </div>

          <div>
            <label>Actualizar foto:</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleUpload}
              disabled={uploading}
            />
          </div> 

          <div>
            <label>Nombre:</label>
            <input
              type="text"
              value={profile.nombres}
              onChange={(e) =>
                setProfile({ ...profile, nombres: e.target.value })
              }
            />
          </div>*/}
          <BtnSave
            titulo="Guardar"
            bgcolor={v.colorselector}
            icono={<v.iconoguardar/>}            
            disabled={uploading}
          />
        </form>
      </section>
      <section className='main'>        
      </section>
    </Container>
  )
}

const Container = styled.div`
  min-height: 100vh;
  padding: 15px;
  width: 100%;
  background: ${({ theme}) => theme.bgtotal };
  color: ${({ theme}) => theme.text }; 
  display: grid;
  grid-template: 
    "header" 100px
    "area1" auto
    "area2" auto
    "main" 1fr;

  .header {
    grid-area: header; 
    /* background-color: rgba(103,93,241,0.14); */
    display: flex;
    align-items: center;
  }

  .area1 {
    grid-area: area1;
    /* background-color: rgba(229,67,26,0.14); */
    display: flex;
    align-items: center;
    justify-content: center;
    
  }

  .area2 {
    grid-area: area2;
    /* background-color: rgba(77,237,106,0.14); */
    display: flex;
    align-items: center;

    .perfil-container {
      max-width: 400px;
      margin: auto;
      padding: 1.5rem;
      background: var(--background);
      border-radius: 12px;
      text-align: start;
      display: flex;
      flex-direction: column;
      gap: 10px;
      
      label {
        font-weight: 550;        
      }
    }

    .perfil-avatar img {
      box-shadow: 0 0 10px rgba(0,0,0,0.2);
    }

    input[type="file"] {
      margin-top: 0.5rem;
    }

    button {
      margin-top: 1rem;
      background: var(--primary-color);
      color: white;
      border: none;
      border-radius: 6px;
      padding: 0.5rem 1rem;
      cursor: pointer;
    }

  }
  .main {
    grid-area: main;
    /* background-color: rgba(179,46,241,0.14); */
  }
`
