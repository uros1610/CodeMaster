import React, { useState, useRef, useEffect } from 'react';
import { FaTrash, FaEdit, FaCheck } from 'react-icons/fa';

const Input = ({ id, inputs, outputs, setInputs, setOutputs }) => {
    const [texts, setTexts] = useState([...inputs]);
    const [texts2, setTexts2] = useState([...outputs]);
    const [edit, setEdit] = useState(false);

    const itemsRef = useRef(Array(inputs.length).fill(null).map(() => React.createRef()));

    const handleDelete = (id) => {
        setInputs(inputs.filter((obj2, idx) => idx !== id));
        setOutputs(outputs.filter((obj, idx) => idx !== id));
    };

    const handleEdit = (e, id) => {
        e.preventDefault();
        setEdit(true);
        const el = itemsRef.current[id].current;
        if (el) {
            el.readOnly = false;
        }
    };

    const applyChanges = (e,id) => {
      e.preventDefault()

      const el = itemsRef.current[id].current;
        if (el) {
            el.readOnly = true;
        }
      
      const newInputs = inputs.map((obj,idx) => (id === idx ? texts[id] : obj))
      const newOutputs = outputs.map((obj,idx) => (id === idx ? texts2[id] : obj))

      
        setEdit(false)
      

      setInputs(newInputs)
      setOutputs(newOutputs)

    }


    useEffect(() => {
        setTexts([...inputs]);
        setTexts2([...outputs]);
    }, [inputs, outputs]);

    const handleChange = (id, event) => {
        const newTexts = [...texts];
        newTexts[id] = event.target.value;
        setTexts(newTexts);
    };

    const handleChange2 = (id, event) => {
        const newTexts = [...texts2];
        newTexts[id] = event.target.value;
        setTexts2(newTexts);
    };

    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '20px',
            }}
        >
            <textarea
                key={id}
                readOnly = {!edit}
                ref={itemsRef.current[id]}
                value={texts[id]}
                onInput={(event) => handleChange(id, event)}
                style={{
                    minHeight: '50px',
                }}
            />
            <textarea
                key={id}
                readOnly = {!edit}
                ref={itemsRef.current[id]}
                value={texts2[id]}
                onInput={(event) => handleChange2(id, event)}
                style={{
                    minHeight: '50px',
                }}
            />
            <button
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '6px 12px',
                    backgroundColor: 'red',
                    color: 'white',
                    border: '2px solid white',
                    borderRadius: '5px',
                    marginRight: '10px',
                }}
                onClick={(e) => {
                    e.preventDefault();
                    handleDelete(id);
                }}
            >
                <FaTrash />
            </button>

            {!edit ? (
                <button
                    className="editBtn"
                    style={{
                        marginRight: '10px',
                    }}
                    onClick={(e) => handleEdit(e, id)}
                >
                    <FaEdit />
                </button>
            ) : (
                <button
                    className="checkBtn"
                    style={{
                        marginRight: '10px',
                    }}
                    onClick={(e) => applyChanges(e, id)}
                >
                    <FaCheck />
                </button>
            )}
        </div>
    );
};

export default Input;
