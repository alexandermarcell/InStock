import "./DeleteModal.scss";
import closeIcon from "../../assets/icons/close-24px.svg";
import axios from "axios";

const site = 'https://alex-instock-server.herokuapp.com/';

function DeleteModal({ closeModal, id, type, item }) {
  const deleteItem = () => {
    axios
      .delete(` ${site}${type}/${id}`)
      .catch((err) => console.log(err));
    closeModal();
  };

  return (
    <div className="modal">
      <div className="modal__wrapper">
        <div className="modal__container">
          <div className="modal__btn">
            <img
              src={closeIcon}
              className="modal__btn-btn"
              onClick={() => closeModal()}
              alt="X for close"
            />
          </div>
          <div className="title">
            <h1 className="title__txt">{`Delete ${item} ${
              type === "inventory" ? "inventory item" : "warehouse"
            }?`}</h1>
          </div>
          <div className="body">
            <p className="body__txt">
              {`Please confirm that you'd like to delete       ${
                type === "inventory"
                  ? item + " from the inventory list. "
                  : "the " + item + " from the list of warehouses. "
              }     You won't be able to undo this action`}
            </p>
          </div>
        </div>
        <div className="footer">
          <button className="footer__cancel" onClick={() => closeModal()}>
            Cancel
          </button>
          <button className="footer__delete" onClick={() => deleteItem()}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
