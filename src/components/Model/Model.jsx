import { useEffect, useState } from "react";
import styles from "./Model.module.css"
import { Assistant as Gemini } from "../../assistants/Googleai";
export function Model({onModelChange})
{
    const [model ,setModel] = useState("gemini-1.5-flash-8b")

    function handleValueChange(event)
    {
        setModel(event.target.value);
    }

    useEffect(() => 
    {
        onModelChange(new Gemini(model));
    }, [model])

    return (<div className={styles.Model}>
        <span>Model:</span>
        <select className={styles.Selector} defaultValue={model} onChange={handleValueChange}>
            <option value="gemini-2.0-flash">Flash 2.0</option>
            <option value="gemini-1.5-flash">Flash 1.5</option>
            <option value="gemini-1.5-flash-8b">Flash-8B 1.5</option>
        </select>
    </div>);
}