const SyntheticEvent = event => ({
    target: {
        id: event.target.id,
        name: event.target.name,
        checked: event.target.checked,
        value: event.target.value
    }
});

export default SyntheticEvent;
