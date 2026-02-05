#!/bin/bash

# Link the assets from apps/mobile/assets to the workspace root
# This is needed because withNxMetro sets projectRoot to workspace root,
# causing Metro to look for assets at the root level

# Get the workspace root path (script should be run from workspace root)
workspace_root="$(cd "$(dirname "$0")/../.." && pwd)"
mobile_assets_path="$workspace_root/apps/mobile/assets"
root_assets_path="$workspace_root/assets"

# Check if root assets already exists
if [ -e "$root_assets_path" ]; then
  # If it's already a symlink, we're good
  if [ -L "$root_assets_path" ]; then
    echo "Symlink already exists: $root_assets_path -> $(readlink "$root_assets_path")"
    exit 0
  else
    # If it's a directory/file but not a symlink, remove it
    echo "Removing existing $root_assets_path (not a symlink)"
    rm -rf "$root_assets_path"
  fi
fi

# Create the symlink from root/assets to apps/mobile/assets
ln -s "$mobile_assets_path" "$root_assets_path"
echo "Created symlink: $root_assets_path -> $mobile_assets_path"
