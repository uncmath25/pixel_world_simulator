.PHONY: clean build run bundle deploy

IMAGE_NAME := uncmath25/pixel-world-simulator
CONTAINER_NAME := pixel_world_simulator
REMOTE_WORKING_DIR=/usr/src/app
SERVER_PORT=3000
BUNDLE_DIR=build

REMOTE_SERVER_PROFILE="testing-lab"
REMOTE_WEBSITE_DIR="/home/player1/websites/pixel_world_simulator"

default: run

clean:
	@echo "*** Purging repo of unnecessary artifacts... ***"
	sudo rm -rf $(BUNDLE_DIR)

build: clean
	@echo "*** Building npm docker image for pixel world simulator... ***"
	docker build -t $(IMAGE_NAME) .

run: build
	@echo "*** Running the node game server... ***"
	@echo "*** View the server at http://localhost:$(SERVER_PORT) ***"
	docker run \
		-it \
		--rm \
		--name $(CONTAINER_NAME) \
		-p $(SERVER_PORT):$(SERVER_PORT) \
		-v "$$(pwd)/src/:$(REMOTE_WORKING_DIR)/src/" \
		$(IMAGE_NAME) \
		npm run start

bundle: build
	@echo "*** Bundling static js deployment package ***"
	mkdir $(BUNDLE_DIR)
	docker run \
		--rm \
		-v "$$(pwd)/$(BUNDLE_DIR)/:$(REMOTE_WORKING_DIR)/$(BUNDLE_DIR)/" \
		$(IMAGE_NAME)

deploy: bundle
	@echo "*** Deploying game deployment package to droplet ***"
	ssh $(REMOTE_SERVER_PROFILE) "rm -rf $(REMOTE_WEBSITE_DIR)"
	scp -r $(BUNDLE_DIR) $(REMOTE_SERVER_PROFILE):$(REMOTE_WEBSITE_DIR)
	@echo "*** Ensure that the nginx.conf is appended to the server's nginx.conf and restart the server's nginx ***"
