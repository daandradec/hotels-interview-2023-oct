export interface FormLogin extends HTMLFormElement{
    readonly elements: CustomElements
}

interface CustomElements extends HTMLFormControlsCollection   {
    user: { value: string };
    password: { value: string };
}