let midiAccess = null;
let selectedInput = null;

function logMessage(message) {
    const logDiv = document.getElementById('log');
    const entry = document.createElement('div');
    entry.textContent = message;
    logDiv.prepend(entry);
}

function onMIDIMessage(event) {
    const [status, data1, data2] = event.data;
    console.log('MIDI message received:', event.data); // Debugging log
    logMessage(`Status: ${status}, Data1: ${data1}, Data2: ${data2}`);
}

function populateMIDIDevices() {
    const select = document.getElementById('midi-devices');
    select.innerHTML = '';

    midiAccess.inputs.forEach((input) => {
        const option = document.createElement('option');
        option.value = input.id;
        option.textContent = input.name;
        select.appendChild(option);
    });

    select.onchange = () => {
        if (selectedInput) {
            selectedInput.onmidimessage = null;
        }
        selectedInput = midiAccess.inputs.get(select.value);
        if (selectedInput) {
            selectedInput.onmidimessage = onMIDIMessage;
            logMessage(`Selected device: ${selectedInput.name}`);
        } else {
            logMessage('Selected input device not found.');
        }
    };

    if (select.options.length > 0) {
        select.dispatchEvent(new Event('change'));
    } else {
        logMessage('No MIDI devices found.');
    }
}

navigator.requestMIDIAccess()
    .then((access) => {
        midiAccess = access;
        populateMIDIDevices();
        midiAccess.onstatechange = populateMIDIDevices;
    })
    .catch((err) => {
        logMessage(`Failed to get MIDI access: ${err}`);
    });
