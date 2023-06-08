<script lang="ts">
	import Globe from '$lib/Globe.svelte';
	import { onMount } from 'svelte';

	export let data;

	let date = new Date();
	let mounted = false;

	$: songInfo = data.body;
	$: today = date.toLocaleDateString('en-US', {
		weekday: 'long',
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	});

	$: time = date.toLocaleTimeString('en-US', {
		hour: 'numeric',
		minute: '2-digit',
		second: 'numeric'
	});
	$: hours = date.getHours();

	$: greeting = hours < 12 ? 'Morning' : hours <= 16 && hours >= 12 ? 'Afternoon' : 'Evening';

	onMount(() => {
		mounted = true;
		const interval = setInterval(() => {
			date = new Date();
		}, 1000);
		return () => {
			clearInterval(interval);
		};
	});
</script>

<svelte:head>
	<title>mary.dev</title>
	<meta name="description" content="Mary Haedrich's Website" />
</svelte:head>

<div
	class="scrollbar h-[calc(100vh-120px)] lg:h-full overflow-auto lg:overflow-none flex flex-col lg:flex-row lg:justify-between"
>
	<!-- <div class="hidden sm:flex flex-col gap-2 w-fit p-4">
		<a href="/">/home</a>
		<a href="/about">/about</a>
		<a href="/projects">/projects</a>
	</div> -->
	{#if mounted}
		<div class="w-full p-4 border-2 border-blue-400">
			<div class="w-64">
				<h1 class="tracking-tighter text-lg sm:text-2xl font-medium">
					<span>Good {greeting},</span>
					<br />
					<span>Visitor.</span>
				</h1>

				<h2 class="pt-4 text-sm">
					{today}<br />{time}
				</h2>

				<div class="pt-8 w-full flex gap-4 text-sm sm:text-base">
					<a href="mailto:hello@mary.dev" target="_blank"> email </a>

					<a href="https://github.com/marydotdev" target="_blank"> github </a>

					<a href="https://twitter.com/marydotdev" target="_blank"> twitter </a>
				</div>
			</div>

			<!-- <div class="w-full h-full flex justify-center items-center">
				<Globe />
			</div> -->

			<div class="pt-12 col-span-2 flex gap-4 items-center text-sm font-mono italic">
				<div class="min-w-max">
					<svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512">
						<path
							fill="#1ed760"
							d="M248 8C111.1 8 0 119.1 0 256s111.1 248 248 248 248-111.1 248-248S384.9 8 248 8Z"
						/>
						<path
							d="M406.6 231.1c-5.2 0-8.4-1.3-12.9-3.9-71.2-42.5-198.5-52.7-280.9-29.7-3.6 1-8.1 2.6-12.9 2.6-13.2 0-23.3-10.3-23.3-23.6 0-13.6 8.4-21.3 17.4-23.9 35.2-10.3 74.6-15.2 117.5-15.2 73 0 149.5 15.2 205.4 47.8 7.8 4.5 12.9 10.7 12.9 22.6 0 13.6-11 23.3-23.2 23.3zm-31 76.2c-5.2 0-8.7-2.3-12.3-4.2-62.5-37-155.7-51.9-238.6-29.4-4.8 1.3-7.4 2.6-11.9 2.6-10.7 0-19.4-8.7-19.4-19.4s5.2-17.8 15.5-20.7c27.8-7.8 56.2-13.6 97.8-13.6 64.9 0 127.6 16.1 177 45.5 8.1 4.8 11.3 11 11.3 19.7-.1 10.8-8.5 19.5-19.4 19.5zm-26.9 65.6c-4.2 0-6.8-1.3-10.7-3.6-62.4-37.6-135-39.2-206.7-24.5-3.9 1-9 2.6-11.9 2.6-9.7 0-15.8-7.7-15.8-15.8 0-10.3 6.1-15.2 13.6-16.8 81.9-18.1 165.6-16.5 237 26.2 6.1 3.9 9.7 7.4 9.7 16.5s-7.1 15.4-15.2 15.4z"
						/>
					</svg>
				</div>
				<div>
					{#if data.body.isPlaying && data.body.song}
						<a href={songInfo.songUrl} target="_blank">{songInfo.title} <br /> {songInfo.artist}</a>
					{:else}
						<p>Currently offline</p>
					{/if}
				</div>
			</div>
		</div>
		<div class="scrollbar lg:h-[calc(100vh-120px)] lg:overflow-y-scroll border-2 border-red-400">
			<div>
				<article class="prose prose-zinc dark:prose-invert">
					<header>
						<h1>AS WE MAY THINK</h1>
						<h2 class="">by VANNEVAR BUSH</h2>
						<h3>THE ATLANTIC MONTHLY, JULY 1945</h3>
					</header>

					<blockquote>
						As Director of the Office of Scientific Research and Development, Dr. Vannevar Bush has
						coordinated the activities of some six thousand leading American scientists in the
						application of science to warfare. In this significant article he holds up an incentive
						for scientists when the fighting has ceased. He urges that men of science should then
						turn to the massive task of making more accessible our bewildering store of knowledge.
						For many years inventions have extended man's physical powers rather than the powers of
						his mind. Trip hammers that multiply the fists, microscopes that sharpen the eye, and
						engines of destruction and detection are new results, but the end results, of modern
						science. Now, says Dr. Bush, instruments are at hand which, if properly developed, will
						give man access to and command over the inherited knowledge of the ages. The perfection
						of these pacific instruments should be the first objective of our scientists as they
						emerge from their war work. Like Emerson's famous address of 1837 on ``The American
						Scholar,'' this paper by Dr. Bush calls for a new relationship between thinking man and
						the sum of our knowledge.
					</blockquote>
					<cite>- The Editor</cite>

					<main>
						<section id="1">
							<h4>I</h4>
							<p>
								This has not been a scientist's war; it has been a war in which all have had a part.
								The scientists, burying their old professional competition in the demand of a common
								cause, have shared greatly and learned much. It has been exhilarating to work in
								effective partnership. Now, for many, this appears to be approaching an end. What
								are the scientists to do next? For the biologists, and particularly for the medical
								scientists, there can be little indecision, for their war work has hardly required
								them to leave the old paths. Many indeed have been able to carry on their war
								research in their familiar peacetime laboratories. Their objectives remain much the
								same. It is the physicists who have been thrown most violently off stride, who have
								left academic pursuits for the making of strange destructive gadgets, who have had
								to devise new methods for their unanticipated assignments. They have done their part
								on the devices that made it possible to turn back the enemy. They have worked in
								combined effort with the physicists of our allies. They have felt within themselves
								the stir of achievement. They have been part of a great team. Now, as peace
								approaches, one asks where they will find objectives worthy of their best.
							</p>

							<p>
								Of what lasting benefit has been man's use of science and of the new instruments
								which his research brought into existence? First, they have increased his control of
								his material environment. They have improved his food, his clothing, his shelter;
								they have increased his security and released him partly from the bondage of bare
								existence. They have given him increased knowledge of his own biological processes
								so that he has had a progressive freedom from disease and an increased span of life.
								They are illuminating the interactions of his physiological and psychological
								functions, giving the promise of an improved mental health.
							</p>

							<p>
								Science has provided the swiftest communication between individuals; it has provided
								a record of ideas and has enabled man to manipulate and to make extracts from that
								record so that knowledge evolves and endures throughout the life of a race rather
								than that of an individual.
							</p>

							<p>
								There is a growing mountain of research. But there is increased evidence that we are
								being bogged down today as specialization extends. The investigator is staggered by
								the findings and conclusions of thousands of other workers - conclusions which he
								cannot find time to grasp, much less to remember, as they appear. Yet specialization
								becomes increasingly necessary for progress, and the effort to bridge between
								disciplines is correspondingly superficial.
							</p>

							<p>
								Professionally our methods of transmitting and reviewing the results of research are
								generations old and by now are totally inadequate for their purpose. If the
								aggregate time spent in writing scholarly works and in reading them could be
								evaluated, the ratio between these amounts of time might well be startling. Those
								who conscientiously attempt to keep abreast of current thought, even in restricted
								fields, by close and continuous reading might well shy away from an examination
								calculated to show how much of the previous month's efforts could be produced on
								call. Mendel's concept of the laws of genetics was lost to the world for a
								generation because his publication did not reach the few who were capable of
								grasping and extending it; and this sort of catastrophe is undoubtedly being
								repeated all about us, as truly significant attainments become lost in the mass of
								the inconsequential.
							</p>

							<p>
								The difficulty seems to be, not so much that we publish unduly in view of the extent
								and variety of present-day interests, but rather that publication has been extended
								far beyond our present ability to make real use of the record. The summation of
								human experience us being expanded at a prodigious rate, and the means we use for
								threading through the consequent maze to the momentarily important item is the same
								as was used in the days of square-rigged ships.
							</p>

							<p>
								But there are signs of a change as new and powerful instrumentalities come into use.
								Photocells capable of seeing things in a physical sense, advanced photography which
								can record what is seen or even what is not, thermionic tubes capable of controlling
								potent forces under the guidance of less power than a mosquito uses to vibrate his
								wings, cathode ray tubes rendering visible an occurrence so brief that by comparison
								a microsecond is a long time, relay combinations which will carry out involved
								sequences of movements more reliably than any human operator and thousand of times
								as fast - there are plenty of mechanical aids with which to effect a transformation
								in scientific records.
							</p>

							<p>
								Two centuries ago Leibnitz invented a calculating machine which embodied most of the
								essential features of recent keyboard devices, but it could not then come into use.
								The economics of the situation were against it: the labor involved in constructing
								it, before the days of mass production, exceeded the labor to be saved by its use,
								since all it could accomplish could be duplicated by sufficient use of pencil and
								paper. Moreover, it would have been subject to frequent breakdown, so that it could
								not have been depended upon; for at that time and long after, complexity and
								unreliability were synonymous.
							</p>

							<p>
								Babbage, even with remarkably generous support for his time, could not produce his
								great arithmetical machine. His idea was sound enough, but construction and
								maintenance costs were then too heavy. Had a Pharaoh been given detailed and
								explicit designs of an automobile, and had he understood them completely, it would
								have taxed the resources of his kingdom to have fashioned the thousands of parts for
								a single car, and that car would have broken down on the first trip to Giza.
							</p>

							<p>
								Machines with interchangeable parts can now be constructed with great economy of
								effort. In spite of much complexity, they perform reliably. Witness the humble
								typewriter, or the movie camera, or the automobile. Electrical contacts have ceased
								to stick when thoroughly understood. Note the automatic telephone exchange, which
								has hundred of thousands of such contacts, and yet is reliable. A spider web of
								metal, sealed in a thin glass container, a wire heated to brilliant glow, in short,
								the thermionic tube of radio sets, is made by the hundred million, tossed about in
								packages, plugged into sockets - and it works! Its gossamer parts, the precise
								location and alignment involved in its construction, would have occupied a master
								craftsman of the guild for months; now it is built for thirty cents. The world has
								arrived at an age of cheap complex devices of great reliability; and something is
								bound to come of it.
							</p>
						</section>
						<section id="2">
							<h4>II</h4>
							<p>
								A record, if it is to be useful to science, must be continuously extended, it must
								be stored, and above all it must be consulted. Today we make the record
								conventionally by writing and photography, followed by printing; but we also record
								on film, on wax disks, and on magnetic wires. Even if utterly new recording
								procedures do not appear, these present ones are certainly in the process of
								modification and extension.
							</p>
							<p>
								Certainly progress in photography is not going to stop. Faster material and lenses,
								more automatic cameras, finer-grained sensitive compounds to allow an extension of
								the minicamera idea, are all imminent. Let us project this trend ahead to a logical,
								if not inevitable, outcome. The camera hound of the future wears on his forehead a
								lump a little larger than a walnut. It takes pictures 3 millimeters square, later to
								be projected or enlarged, which after all involves only a factor of 10 beyond
								present practice. The lens is of universal focus, down to any distance accommodated
								by the unaided eye, simply because it is of short focal length. There is a built-in
								photocell on the walnut such as we now have on at least one camera, which
								automatically adjusts exposure for a wide range of illumination. There is film in
								the walnut for a hundred exposure, and the spring for operating its shutter and
								shifting its film is wound once for all when the film clip is inserted. It produces
								its result in full color. It may well be stereoscopic, and record with spaced glass
								eyes, for striking improvements in stereoscopic technique are just around the
								corner.
							</p>
							<p>
								The cord which trips its shutter may reach down a man's sleeve within easy reach of
								his fingers. A quick squeeze, and the picture is taken. On a pair of ordinary
								glasses is a square of fine lines near the top of one lens, where it is out of the
								way of ordinary vision. When an object appears in that square, it is lined up for
								its picture. As the scientist of the future moves about the laboratory or the field,
								every time he looks at something worthy of the record, he trips the shutter and in
								it goes, without even an audible click. Is this all fantastic? The only fantastic
								thing about it is the idea of making as many pictures as would result from its use.
							</p>
							<p>
								Will there be dry photography? It is already here in two forms. When Brady made his
								Civil War pictures, the plate had to be wet at the time of exposure. Now it has to
								be wet during development instead. In the future perhaps it need not be wetted at
								all. There have long been films impregnated with diazo dyes which form a picture
								without development, so that it is already there as soon as the camera has been
								operated. An exposure to ammonia gas destroys the unexposed dye, and the picture can
								then be taken out into the light and examined. The process is now slow, but someone
								may speed it up, and it has no grain difficulties such as now keep photographic
								researchers busy. Often it would be advantageous to be able to snap the camera and
								to look at the picture immediately.
							</p>
							<p>
								Another process now is use is also slow, and more or less clumsy. For fifty years
								impregnated papers have been used which turn dark at every point where an electrical
								contact touches them, by reason of the chemical change thus produced in an iodine
								compound included in the paper. They have been used to make records, for a pointer
								moving across them can leave a trail behind. If the electrical potential on the
								pointer is varied as it moves, the line becomes light or dark in accordance with the
								potential.
							</p>
							<p>
								This scheme is now used in facsimile transmission. The pointer draws a set of
								closely spaced lines across the paper one after another. As it moves, its potential
								is varied in accordance with a varying current received over wires from a distant
								station, where these variations are produced by a photocell which is similarly
								scanning a picture. At every instant the darkness of the line being drawn is made
								equal to the darkness of the point on the picture being observed by the photocell.
								Thus, when the whole picture has been covered, a replica appears at the receiving
								end.
							</p>
							<p>
								A scene itself can be just as well looked over line by line by the photocell in this
								way as can a photograph of the scene. This whole apparatus constitutes a camera,
								with the added feature, which can be dispensed with if desired, of making its
								picture at a distance. It is slow, and the picture is poor in detail. Still, it does
								give another process of dry photography, in which the picture is finished as soon as
								it is taken.
							</p>
							<p>
								It would be a brave man who could predict that such a process will always remain
								clumsy, slow, and faulty in detail. Television equipment today transmits sixteen
								reasonably good images a second, and it involves only two essential differences from
								the process described above. For one, the record is made by a moving beam of
								electrons rather than a moving pointer, for the reason that an electron beam can
								sweep across the picture very rapidly indeed. The other difference involves merely
								the use of a screen which glows momentarily when the electrons hit, rather than a
								chemically treated paper or film which is permanently altered. This speed is
								necessary in television, for motion pictures rather than stills are the object.
							</p>
							<p>
								Use chemically treated film in place of the glowing screen, allow the apparatus to
								transmit one picture rather than a succession, and a rapid camera for dry
								photography results. The treated film needs to be far faster in action than present
								examples, but it probably could be. More serious is the objection that this scheme
								would involve putting the film inside a vacuum chamber, for electron beams behave
								normally only in such a rarefied environment. This difficulty could be avoided by
								allowing the electron beam to play on one side of a partition, and by pressing the
								film against the other side, if this partition were such as to allow the electrons
								to go through perpendicular to its surface, and to prevent them from spreading out
								sideways. Such partitions, in crude form, could certainly be constructed, and they
								will hardly hold up the general development.
							</p>
							<p>
								Like dry photography, microphotography still has a long way to go. The basic scheme
								of reducing the size of the record, and examining it by projection rather than
								directly, has possibilities too great to be ignored. The combination of optical
								projection and photographic reduction is already producing some results in microfilm
								for scholarly purposes, and the potentialities are highly suggestive. Today, with
								microfilm, reductions by a linear factor of 20 can be employed and still produce
								full clarity when the material is re-enlarged for examination. The limits are set by
								the graininess of the film, the excellence of the optical system, and the efficiency
								of the light sources employed. All of these are rapidly improving.
							</p>
							<p>
								Assume a linear ratio of 100 for future use. Consider film of the same thickness as
								paper, although thinner film will certainly be usable. Even under these conditions
								there would be a total factor of 10,000 between the bulk of the ordinary record on
								books, and its microfilm replica. The Encyclopoedia Britannica could be reduced to
								the volume of a matchbox. A library of a million volumes could be compressed into
								one end of a desk. If the human race has produced since the invention of movable
								type a total record, in the form of magazines, newspapers, books, tracts,
								advertising blurbs, correspondence, having a volume corresponding to a billion
								books, the whole affair, assembled and compressed, could be lugged off in a moving
								van. Mere compression, of course, is not enough; one needs not only to make and
								store a record but also to be able to consult it, and this aspect of the matter
								comes later. Even the modern great library is not generally consulted; it is nibbled
								by a few.
							</p>
							<p>
								Compression is important, however, when it comes to costs. The material for the
								microfilm Britannica would cost a nickel, and it could be mailed anywhere for a
								cent. What would it cost to print a million copies? To print a sheet of newspaper,
								in a large edition, costs a small fraction of a cent. The entire material of the
								Britannica in reduced microfilm form would go on a sheet eight and one-half by
								eleven inches. Once it is available, with the photographic reproduction methods of
								the future, duplicates in large quantities could probably be turned out for a cent
								apiece beyond the cost of materials. The preparation of the original copy? That
								introduces the next aspect of the subject.
							</p>
						</section>
					</main>
				</article>
			</div>
		</div>
		<div class="w-full p-4 border-2 border-green-400">
			<div class="w-64">
				<h1 class="tracking-tighter text-lg sm:text-2xl font-medium">Weather</h1>

				<h2 class="pt-4 text-sm">
					{today}<br />{time}
				</h2>

				<div class="pt-8 w-full flex gap-4 text-sm sm:text-base">
					<a href="mailto:hello@mary.dev" target="_blank"> email </a>

					<a href="https://github.com/marydotdev" target="_blank"> github </a>

					<a href="https://twitter.com/marydotdev" target="_blank"> twitter </a>
				</div>

				<div class="pt-8 w-full flex flex-col gap-4 text-sm sm:text-base">
					<a href="/"> home </a>

					<a href="/about"> about </a>

					<a href="/configurator"> configurator </a>

					<a href="/mary3d"> mary3d </a>

					<a href="/posts"> posts </a>

					<a href="/projects"> projects </a>
				</div>
			</div>

			<!-- <div class="w-full h-full flex justify-center items-center">
				<Globe />
			</div> -->

			<div class="pt-12 col-span-2 flex gap-4 items-center text-sm font-mono italic" />
		</div>
	{/if}
</div>

<style>
	.scrollbar::-webkit-scrollbar-track {
		background-color: #fafafa;
	}

	.scrollbar::-webkit-scrollbar {
		width: 10px;
		background-color: #fafafa;
	}

	.scrollbar::-webkit-scrollbar-thumb {
		-webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
		background-color: #18181b;
	}
</style>
