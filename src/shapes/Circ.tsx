import * as React from 'react';
import {ShapeProps} from './Shape';
import {useSelector, useDispatch} from 'react-redux';
import Handle from './Handle';
import { ValueLink, 
        getLinkedValue, 
        manipulation, 
        manipulate, 
        getLinkedVector, 
        vecManipulation } from 'src/redux/Manipulation';
import { scuteStore } from 'src/redux/ScuteStore';
import { getColorFromArray } from './StyleUtilities';

export const Circ = ({defs}:ShapeProps) => {
    let attrs: Array<ValueLink> = defs.attrs;
    let dispatch = useDispatch();

    const position:number = useSelector((store:scuteStore) => getLinkedVector(store.root.lines, attrs['position']));
    const radius:number = useSelector((store:scuteStore) => getLinkedValue(store.root.lines, attrs['radius']));
    
    const styles = {
        fill: defs.styles['fill'] ? getColorFromArray(defs.styles['fill']) : null,
        stroke: defs.styles['stroke'] ? getColorFromArray(defs.styles['stroke']) : null,
        strokeWidth: defs.styles['strokeWidth'],
    }

    const[hovering, setHover] = React.useState(false);

    const setRadius = (dx: number, dy: number) => {
        dispatch(manipulate(manipulation(dx, attrs['radius'])));
    }

    const setPosition = (dx: number, dy: number) => {
        dispatch(manipulate(vecManipulation(dx, dy, attrs['position'])));
    }

    return (
		<g className="hoverGroup" onMouseOver={() => setHover(true)} onMouseLeave={() => setHover(false)}>
			<circle className={(hovering ? 'hover' : '')}
				cx={position[0]} 
				cy={position[1]} 
                r={radius} 
                style={styles}
			></circle>
            {hovering ?
                <g>         
                    <Handle
                        cx={position[0] + radius}
                        cy={position[1]}
                        adjust={setRadius}
                    ></Handle>
                    <Handle
                        cx={position[0]}
                        cy={position[1]}
                        adjust={setPosition}
                    ></Handle>
                </g>
            : null}
		</g>
    );
 }