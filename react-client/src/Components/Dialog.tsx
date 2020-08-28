import * as React from 'react'

type DialogType = {
  title: string
  Ref: React.RefObject<HTMLDialogElement>
}

const Dialog: React.FunctionComponent<DialogType> = (props) => {
  const close = () => {
    if (props.Ref.current !== null) {
      props.Ref.current.close()
    }
  }

  return (
    <dialog id={props.title} ref={props.Ref}>
      <div className="dialog-close" onClick={close}>
        ×
      </div>
      {props.children}
    </dialog>
  )
}

export default Dialog
