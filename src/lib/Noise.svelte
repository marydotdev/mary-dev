<div class="noise" />

<style>
	.noise {
		height: 100vh;
		position: fixed;
		pointer-events: none;
	}

	.noise:before {
		animation: grain 1s steps(1) infinite;
		background-image: url('/otis-redding.png');
    /* background-image: url('/dotnoise-light-grey.png'); */
		content: '';
		position: fixed;
		height: 300%;
		left: -50%;
		opacity: 0.5;
		position: fixed;
		top: -100%;
		width: 300%;
		pointer-events: none;
	}

	@keyframes grain {
		0% {
			transform: translate3d(0, 0.9rem, 0);
			-webkit-transform: translate3d(0, 0.9rem, 0);
			-moz-transform: translate3d(0, 0.9rem, 0);
			-ms-transform: translate3d(0, 0.9rem, 0);
			-o-transform: translate3d(0, 0.9rem, 0);
		}
		10% {
			transform: translate3d(-0.1rem, -0.4rem, 0);
			-webkit-transform: translate3d(-0.1rem, -0.4rem, 0);
			-moz-transform: translate3d(-0.1rem, -0.4rem, 0);
			-ms-transform: translate3d(-0.1rem, -0.4rem, 0);
			-o-transform: translate3d(-0.1rem, -0.4rem, 0);
		}
		20% {
			transform: translate3d(-0.8rem, 0.2rem, 0);
			-webkit-transform: translate3d(-0.8rem, 0.2rem, 0);
			-moz-transform: translate3d(-0.8rem, 0.2rem, 0);
			-ms-transform: translate3d(-0.8rem, 0.2rem, 0);
			-o-transform: translate3d(-0.8rem, 0.2rem, 0);
		}
		30% {
			transform: translate3d(0.9rem, -0.9rem, 0);
			-webkit-transform: translate3d(0.9rem, -0.9rem, 0);
			-moz-transform: translate3d(0.9rem, -0.9rem, 0);
			-ms-transform: translate3d(0.9rem, -0.9rem, 0);
			-o-transform: translate3d(0.9rem, -0.9rem, 0);
		}
		40% {
			transform: translate3d(-0.2rem, 0.7rem, 0);
			-webkit-transform: translate3d(-0.2rem, 0.7rem, 0);
			-moz-transform: translate3d(-0.2rem, 0.7rem, 0);
			-ms-transform: translate3d(-0.2rem, 0.7rem, 0);
			-o-transform: translate3d(-0.2rem, 0.7rem, 0);
		}
		50% {
			transform: translate3d(-0.9rem, -0.4rem, 0);
			-webkit-transform: translate3d(-0.9rem, -0.4rem, 0);
			-moz-transform: translate3d(-0.9rem, -0.4rem, 0);
			-ms-transform: translate3d(-0.9rem, -0.4rem, 0);
			-o-transform: translate3d(-0.9rem, -0.4rem, 0);
		}
		60% {
			transform: translate3d(0.2rem, 0.6rem, 0);
			-webkit-transform: translate3d(0.2rem, 0.6rem, 0);
			-moz-transform: translate3d(0.2rem, 0.6rem, 0);
			-ms-transform: translate3d(0.2rem, 0.6rem, 0);
			-o-transform: translate3d(0.2rem, 0.6rem, 0);
		}
		70% {
			transform: translate3d(0.7rem, -0.8rem, 0);
			-webkit-transform: translate3d(0.7rem, -0.8rem, 0);
			-moz-transform: translate3d(0.7rem, -0.8rem, 0);
			-ms-transform: translate3d(0.7rem, -0.8rem, 0);
			-o-transform: translate3d(0.7rem, -0.8rem, 0);
		}
		80% {
			transform: translate3d(-0.9rem, 0.1rem, 0);
			-webkit-transform: translate3d(-0.9rem, 0.1rem, 0);
			-moz-transform: translate3d(-0.9rem, 0.1rem, 0);
			-ms-transform: translate3d(-0.9rem, 0.1rem, 0);
			-o-transform: translate3d(-0.9rem, 0.1rem, 0);
		}
		90% {
			transform: translate3d(0.6rem, -0.5rem, 0);
		}
		100% {
			transform: translate3d(-0.7rem, 0, 0);
		}
	}
</style>
