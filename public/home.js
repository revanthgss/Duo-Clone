(async() => {
    let localVideo = document.getElementById('localStream');
    // let remoteVideo = document.getElementById('remoteStream');
    let localStream, remoteStream = new MediaStream();
    if (navigator.mediaDevices.getUserMedia) {
        localStream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true
        });
    }
    localVideo.srcObject = localStream;
    localVideo.play();
    const peerConnection = new window.RTCPeerConnection();
    localStream.getTracks().forEach(track => {
        peerConnection.addTrack(track, localStream);
    });
    // remoteVideo.srcObject = remoteStream;
    // peerConnection.addEventListener('track', async(event) => {
    //     remoteStream.addTrack(event.track, remoteStream);
    // });

    let socket = io();
    socket.on('user connected', (user) => {
        $('.users').append(`<div class="user" id="${user}">${user}</div>`);
    });

    socket.on('online users', (users) => {
        users.forEach((user) => {
            $('.users').append(`<div class="user" id="${user}">${user}</div>`);
        });
    });

})();