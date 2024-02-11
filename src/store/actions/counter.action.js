import { addDoc, collection, setDoc, doc, getDoc } from 'firebase/firestore';
import {db} from "../../lib/firebase";

export const incrementCount = () => {
    return async (dispatch) => {
      const counterRef = doc(db, 'counters', 'counter');
      const docSnapshot = await getDoc(counterRef);
  
      if (docSnapshot.exists()) {
        const currentCount = docSnapshot.data().count;
        const newCount = currentCount + 1;
        await setDoc(counterRef, { count: newCount });
        dispatch({ type: 'INCREMENT_COUNT', payload: newCount });
      } else {
        await setDoc(counterRef, { count: 1 });
        dispatch({ type: 'INCREMENT_COUNT', payload: 1 });
      }
    };
  };