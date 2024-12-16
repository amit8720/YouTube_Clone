import './Chip.css';

function Chip(chipDetails){
    return (
        <div className={`chip ${chipDetails.isSelected ? 'selected' : ''}`}>
            <span>{chipDetails.title}</span>
        </div>
    );
}

export default Chip;