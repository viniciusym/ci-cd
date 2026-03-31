import supabase from "../supabase.ts";


const userService = {
  getUsers: async () => {
    try {
      const { data, error } = await supabase.from('users').select();
      if (error) throw new Error(error.message);
      return data;
    } catch (error) {
      console.error(error);
      return error;
    }
  },
  createUser: async (fullName: string, email: string) => {
    if (!email.includes('@')) {
      throw new Error('Email inválido');
    }

    try {
      const { data, error } = await supabase
        .from('users')
        .insert([{ full_name: fullName, email }])
        .select()
        .single();
      if (error) throw new Error(error.message);
      return data;
    } catch (error) {
      console.error(error);
      return error;
    }
  }
}

export default userService;
