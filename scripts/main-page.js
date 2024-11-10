document.addEventListener('DOMContentLoaded', function () {
    const selectedDevice = document.getElementById('selected-device');
    const openDeviceListButton = document.getElementById('open-device-list');
    const deviceList = document.getElementById('device-list');

    // Function to toggle the visibility of the device list
    function toggleDeviceList() {
        deviceList.classList.toggle('hidden');
    }

    // Event listener to open the device list when the button is clicked
    openDeviceListButton.addEventListener('click', toggleDeviceList);

    // Event listener to select a device from the list and update the text
    deviceList.addEventListener('click', function (event) {
        if (event.target.tagName === 'LI') {
            selectedDevice.textContent = event.target.textContent;
            toggleDeviceList(); // Close the device list after selection
        }
    });
});
