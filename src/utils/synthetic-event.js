const SyntheticEvent = value => ({
    target: {
        id: window.event.target.id,
        name: window.event.target.name,
        checked: window.event.target.checked,
        value
    }
});

export default SyntheticEvent;
