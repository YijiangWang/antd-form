import useForm from "./useForm";
import FieldContext from "./FieldContext"

export default function Form({children, form, onFinish, onFinishFailed}) {
  const [formInstance] = useForm(form);
  formInstance.setCallbacks({onFinish, onFinishFailed});
  return (
    <div>
      <form 
        onSubmit={(e) => {
          e.preventDefault();
          formInstance.submit();
        }}
      >
        <FieldContext.Provider value={formInstance}>
          {children}
        </FieldContext.Provider>
      </form>
    </div>
  )
}