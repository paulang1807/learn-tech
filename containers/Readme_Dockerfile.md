## Dockerfile Components
- **FROM** (Required): Base image (usually a minimal linux distribution) or `Scratch` (empty container). Specify relevant existing image name when building on top of existing images.
- **ENV** (Optional): Used to specify environment variables
- **RUN** (Optional): Used to execute commands inside the container
- **EXPOSE** (Optional): Specify ports to be exposed to the virtual docker network
- **CMD** (Required): Final command that is run every time a new container is launched from the image or every time a stopped container is restarted. Each part of the command needs to be specified in quotes and separated by comma.
- **WORKDIR** (Optional): Used to specify working directory (preferable compared to RUN cd ..)
- **COPY** (Optional): Used to copy source code from local to container
    - Copy everything from the current directory in the host to the current directory in the container: `COPY . .`

## Useful Commands
- Build an image from a dockerfile (if dockerfile name is the standard - Dockerfile): `docker image build -t <image_name> <path_for_image>`
    - Build an image from a dockerfile (when using a custom dockerfile name): `docker image build -f <dockerfile_name> -t <image_name> <path_for_image>`

## Good To Know
- When creating a dockerfile the order of the components is critical
    - Things that change less should be specified before the things that change more
    - The build process uses cache for the components that have not changed and rebuilds everything else
        - The rebuild starts at the point the first change is introduced and any subsequent component is rebuilt even if it is not changed.
- When building on top of existing images, we do not need to specify all the required components as they are inherited from the base image.