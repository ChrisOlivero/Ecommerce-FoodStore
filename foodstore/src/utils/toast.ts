export type ToastType =

    "success"

    | "error"

    | "warning"

    | "info";

export function showToast(

    message:string,

    type:ToastType="info"

){

    let container =

        document.querySelector(

            ".toast-container"

        );

    if(!container){

        container =

            document.createElement("div");

        container.className =

            "toast-container";

        document.body.appendChild(

            container

        );

    }

    const toast =

        document.createElement("div");

    toast.className =

        `toast ${type}`;

    toast.innerHTML = `

        <span class="material-symbols-outlined">

            ${
                type==="success"

                ?"check_circle"

                :type==="error"

                ?"error"

                :type==="warning"

                ?"warning"

                :"info"

            }

        </span>

        <span>

            ${message}

        </span>

    `;

    container.appendChild(

        toast

    );

    setTimeout(()=>{

        toast.remove();

    },3000);

}