import { useState } from "react";
import trashIcon from "../assets/trash.png";
import editIcon from "../assets/edit.jpg";
import { useDeleteProduct } from "../services/mutaions";
import styles from "./ProductCard.module.css";
import EditProductForm from "./EditProductForm";
import DeleteProductModal from "./DeleteProductModal";
import  Image  from "next/image";

function ProductCard({ product }) {
  // console.log(product);
  const [isEditModal, setIsEditModal] = useState(false);
  const [isDeleteModal, setIsDeleteModal] = useState(false);

  return (
    <>
      <tr>
        <td>{product?.name}</td>
        <td>{product?.quantity}</td>
        <td>{product?.price}</td>
        <td>{product?.id}</td>
        <td>
          <button
            className={styles.deletebtn}
            onClick={() => setIsDeleteModal(true)}
          >
            <Image src={trashIcon} alt="trashIcon" width={35} height={35} />
          </button>
          <button
            className={styles.editBtn}
            onClick={() => setIsEditModal(true)}
          >
            <Image src={editIcon} alt="editIcon" width={35} height={35} />
          </button>
        </td>
      </tr>

      {isDeleteModal && (
        <DeleteProductModal
          product={product}
          isDeleteModal={isDeleteModal}
          setIsDeleteModal={setIsDeleteModal}
        />
      )}

      {isEditModal && (
        <tr>
          <td>
            <EditProductForm
              product={product}
              isEditModal={isEditModal}
              setIsEditModal={setIsEditModal}
            />
          </td>
        </tr>
      )}
    </>
  );
}

export default ProductCard;
