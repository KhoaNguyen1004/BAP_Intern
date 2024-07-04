import { GetAllTemplate } from "./path";

const GetAllTemplateCaller = async () => {
    return fetch(GetAllTemplate)
        .then((response) => response.json())
        .then((data) => {
        return data;
        });
    };

export { GetAllTemplateCaller};