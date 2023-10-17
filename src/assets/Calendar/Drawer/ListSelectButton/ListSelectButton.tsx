import {
  List,
  getListSelector,
  setListSelector,
} from "@/redux/featrues/ListSelectorSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import styles from "./ListSelectButton.module.scss";
interface ListSelectButtonProps {
  text: string;
  selector: List;
}
const ListSelectButton = ({ text, selector }: ListSelectButtonProps) => {
  const dispatch = useAppDispatch();
  const listSelector = useAppSelector(getListSelector);
  return (
    <div className={styles.container}>
      <div
        className={
          listSelector === selector
            ? styles.selectedBox
            : styles.box
        }
        onClick={() => {
          dispatch(setListSelector(selector));
        }}>
        <div
          className={
            listSelector === selector ? styles.selectedText : styles.text
          }>
          {text}
        </div>
      </div>
    </div>
  );
};

export default ListSelectButton;
