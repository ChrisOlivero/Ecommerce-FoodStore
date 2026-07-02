export abstract class BaseService<T>{

    protected async getData(path:string):Promise<T[]>{

        const response = await fetch(path);

        if(!response.ok){

            throw new Error("No fue posible cargar los datos.");

        }

        return response.json();

    }

}