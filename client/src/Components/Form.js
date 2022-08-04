import React from 'react';
//exports a function that renders any validation errors sent from API
export default function Form (props) {
    const{
        cancel,
        errors,
        submit,
        submitButtonText,
        elements,
    } = props;

    function handleSubmit(event){
        event.preventDefault();
        submit();
    }

    function handleCancel(event){
        event.preventDefault();
        cancel();
    }
    //renders a submit and cancel button and thier functionality via the functions above.
    return( 
    <div>
        <ErrorsDisplay errors={errors} />
        <form onSubmit={handleSubmit}>
          {elements()}
          <div className="pad-bottom">
            <button className="button" type="submit">{submitButtonText}</button>
            <button className="button button-secondary" onClick={handleCancel}>Cancel</button>
          </div>
        </form>
      </div>
      );

}
// renders the validation errors
function ErrorsDisplay({ errors }){
    let errorsDisplay =null;

    if(errors.length){
        errorsDisplay = (
            <div>
              <h2 className="validation--errors--label">Validation errors</h2>
              <div className="validation-errors">
                <ul>
                  {errors.map((error, i) => <li key={i}>{error}</li>)}
                </ul>
              </div>
            </div>
          );
    }
    return errorsDisplay;
}
